import { Request, Response, NextFunction } from 'express';
import { Order, Product, EMIPlan } from '../models/models';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, productId, emiPlanId, selectedVariants } = req.body;

    if (!userId || !productId || !emiPlanId) {
      res.status(400).json({
        success: false,
        message: 'userId, productId and emiPlanId are required',
      });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    if (!product.inStock) {
      res.status(409).json({ success: false, message: 'Product is out of stock' });
      return;
    }

    const plan = await EMIPlan.findById(emiPlanId);
    if (!plan || plan.productId !== productId) {
      res.status(404).json({
        success: false,
        message: 'EMI plan not found or does not match the product',
      });
      return;
    }
    if (!plan.isActive) {
      res.status(409).json({ success: false, message: 'Selected EMI plan is no longer active' });
      return;
    }

    const order = await Order.create({
      userId,
      productId,
      emiPlanId,
      selectedVariants: selectedVariants ?? {},
      status: 'pending',
      totalAmount: plan.totalAmount,
      monthlyAmount: plan.monthlyAmount,
      tenureMonths: plan.tenure,
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .lean();

    const enriched = await Promise.all(
      orders.map(async (order) => {
        const product = await Product.findById(order.productId)
          .select('name image brand discountedPrice')
          .lean();
        return { ...order, product };
      })
    );

    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      res.status(409).json({
        success: false,
        message: `Order cannot be cancelled in '${order.status}' status`,
      });
      return;
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};
