import { Request, Response, NextFunction } from 'express';
import { EMIPlan } from '../models/models';

export const getEMIPlansByProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params;

    const plans = await EMIPlan.find({ productId, isActive: true }).sort({ tenure: 1 });

    if (!plans.length) {
      res.status(404).json({
        success: false,
        message: 'No active EMI plans found for this product',
      });
      return;
    }

    res.json({ success: true, count: plans.length, data: plans });
  } catch (err) {
    next(err);
  }
};
