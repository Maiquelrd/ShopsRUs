import {Router} from 'express';
import { GetAll, GetByID, Create, DeleteByID, UpdateByID, AddRulesByID, RemoveRulesByID} from '../controllers/descuentosController';

const router = Router();

router.get('/', GetAll);

router.get('/:id', GetByID);

router.post('/create', Create);

router.delete('/:id', DeleteByID);

router.put('/:id', UpdateByID);

router.post('/:id/addrules', AddRulesByID);

router.post('/:id/removerules', RemoveRulesByID);

export default router;