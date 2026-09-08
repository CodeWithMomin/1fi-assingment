import { Router } from 'express';
import { getEMIPlansByProduct } from '../controllers/emiPlanController';

const router = Router({ mergeParams: true });

router.get('/', getEMIPlansByProduct);

export default router;
