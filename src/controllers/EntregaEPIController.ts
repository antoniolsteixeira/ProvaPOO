import { Request, Response } from 'express';
import { EntregaEPIServices } from '../services/EntregaEPIServices';

class EntregaEPIController {
  async create(request: Request, response: Response) {
    const { funcionario_id, nome_epi, data_entrega, quantidade_entregue } =
      request.body;
    const entregaEPIServices = new EntregaEPIServices();

    const entregaEPI = await entregaEPIServices.create({
      funcionario_id,
      nome_epi,
      data_entrega,
      quantidade_entregue,
    });

    return response.json(entregaEPI);
  }

  async index(request: Request, response: Response) {
    const entregaEPIServices = new EntregaEPIServices();

    try {
      const entregaEPI = await entregaEPIServices.index();
      return response.json(entregaEPI);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async show(request: Request, response: Response) {
    const entregaEPIServices = new EntregaEPIServices();
    const { id } = request.params;

    try {
      const entregaEPI = await entregaEPIServices.show({ id });
      return response.json(entregaEPI);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    const entregaEPIServices = new EntregaEPIServices();
    const { id } = request.params;

    try {
      await entregaEPIServices.delete({ id });
      return response.json({ Message: 'Deletado com sucesso' });
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async update(request: Request, response: Response) {
    const entregaEPIServices = new EntregaEPIServices();
    const { id } = request.params;
    const { funcionario_id, nome_epi, data_entrega, quantidade_entregue } =
      request.body;

    try {
      const entregaEPI = await entregaEPIServices.update({
        id,
        funcionario_id,
        nome_epi,
        data_entrega,
        quantidade_entregue,
      });
      return response.json(entregaEPI);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export { EntregaEPIController };
