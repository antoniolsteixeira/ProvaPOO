import { getCustomRepository } from 'typeorm';
import { EntregaEPIRepository } from '../repositories/EntregaEPIRepository';

interface IEntregaEPICreate {
  funcionario_id: string;
  nome_epi: string;
  data_entrega: string;
  quantidade_entregue: number;
}

interface IEntregaEPIShow {
  id: string;
}

interface IEntregaEPIUpdate {
  id: string;
  funcionario_id: string;
  nome_epi: string;
  data_entrega: string;
  quantidade_entregue: number;
}

class EntregaEPIServices {
  async create({
    funcionario_id,
    nome_epi,
    data_entrega,
    quantidade_entregue,
  }: IEntregaEPICreate) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository);
    const entregaEPI = entregaEPIRepository.create({
      funcionario_id,
      nome_epi,
      data_entrega,
      quantidade_entregue,
    });

    await entregaEPIRepository.save(entregaEPI);

    return entregaEPI;
  }

  async index() {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository);

    const entregaEPI = await entregaEPIRepository.find({
      relations: ['funcionario'],
    });

    return entregaEPI;
  }

  async show({ id }: IEntregaEPIShow) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository);

    const entregaEPI = await entregaEPIRepository.findOne({ id });

    if (!entregaEPI) {
      throw new Error(' ID não encontrado');
    }

    const entregaEPIs = await entregaEPIRepository.findOne(id, {
      relations: ['funcionario'],
    });

    return entregaEPIs;
  }

  async delete({ id }: IEntregaEPIShow) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository);

    const entregaEPI = await entregaEPIRepository.findOne({ id });

    if (!entregaEPI) {
      throw new Error('ID não encontrado');
    }

    return await entregaEPIRepository.delete({ id });
  }

  async update({
    id,
    funcionario_id,
    nome_epi,
    data_entrega,
    quantidade_entregue,
  }: IEntregaEPIUpdate) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository);

    let entregaEPI = await entregaEPIRepository.findOne({ id });

    if (!entregaEPI) {
      throw new Error('ID não encontrado');
    }

    await entregaEPIRepository.update(id, {
      funcionario_id,
      nome_epi,
      data_entrega,
      quantidade_entregue,
    });

    entregaEPI = await entregaEPIRepository.findOne({ id });

    return entregaEPI;
  }
}

export { EntregaEPIServices };
