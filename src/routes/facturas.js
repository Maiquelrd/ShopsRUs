import {Router} from 'express';
import { GetAll, GetByID, Create, DeleteByID} from '../controllers/facturasController';

const router = Router();

router.get('/', GetAll);

router.get('/:id', GetByID);

router.post('/create', Create);

router.delete('/:id', DeleteByID);

export default router;