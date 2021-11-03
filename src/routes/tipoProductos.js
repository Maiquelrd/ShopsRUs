import {Router} from 'express';
import { GetAll, GetByID, Create, DeleteByID, UpdateByID} from '../controllers/tipoProductosController';

const router = Router();

router.get('/', GetAll);

router.get('/:id', GetByID);

router.post('/create', Create);

router.delete('/:id', DeleteByID);

router.put('/:id', UpdateByID);

export default router;