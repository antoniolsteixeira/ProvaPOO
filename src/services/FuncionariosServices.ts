import { getCustomRepository } from 'typeorm';

import { FuncionariosRepository } from '../repositories/FuncionariosRepository';

interface IFuncinarioCreate {
  nome: string;
  cpf: string;
  funcao: string;
}

interface IFuncinarioShow {
  id: string;
}

interface IFuncinarioUpdate {
  id: string;
  nome: string;
  cpf: string;
  funcao: string;
}

class FuncionariosServices {
  async create({ nome, cpf, funcao }: IFuncinarioCreate) {
    const funcionariosRepository = getCustomRepository(FuncionariosRepository);

    const nomeAlreadyExists = await funcionariosRepository.findOne({
      nome,
      cpf,
      funcao,
    });

    if (nomeAlreadyExists) {
      throw new Error('Nome já cadastrado!');
    }

    const funcionarios = funcionariosRepository.create({
      nome,
      cpf,
      funcao,
    });

    await funcionariosRepository.save(funcionarios);

    return funcionarios;
  }

  async index() {
    const funcionariosRepository = getCustomRepository(FuncionariosRepository);

    const funcionarios = await funcionariosRepository.find();

    return funcionarios;
  }
}

export { FuncionariosServices };
