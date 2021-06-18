import { Router } from 'express';
import { EntregaEPIController } from './controllers/EntregaEPIController';
import { FuncionariosController } from './controllers/FuncionariosController';

const routes = Router();

const funcionariosController = new FuncionariosController();

const entregaEPIController = new EntregaEPIController();

routes.post('/funcionarios', funcionariosController.create);
routes.get('/funcionarios', funcionariosController.index);

routes.post('/entregaepi', entregaEPIController.create);
routes.get('/entregaepi', entregaEPIController.index);
routes.get('/entregaepi/:id', entregaEPIController.show);
routes.delete('/entregaepi/:id', entregaEPIController.delete);
routes.put('/entregaepi/:id', entregaEPIController.update);

export { routes };
