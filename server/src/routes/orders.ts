import { Router } from 'express';
import {
  createOrder,
  getOrdersByUser,
  cancelOrder,
} from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/:userId', getOrdersByUser);
router.patch('/:orderId/cancel', cancelOrder);

export default router;
