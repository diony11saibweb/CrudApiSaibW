import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import Client from './../Entities/client.entity';
import {
  normalizeName,
  normalizeCpfCnpj,
  normalizeDate,
  normalizePhone,
} from './../../../utils/normalizeEnties';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async store(@Body() body: Client): Promise<any> {
    // [x] Passar Query para a entidade Client usandos as triggers (BeforeInsert)
    // [x] Rota de cadastro deve fazer UPDATE
    // [x] Passar CLI_DATACAD para entidade
    // [-] Retirar ".create()" do service
    // [ ] Adicionar Endereços juntos ao cadastro
    // [x] Criar transaction para inserção
    // [ ] Retorno deve passar pelo DTOS
    // [ ] Seguir padrão RESTFULL
    // [X] Consultar params ( Por Name, Cpf, Cnpj, DataNasc )

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const {
      CLI_ID = 0,
      CLI_NOME,
      CLI_CNPJ_CPF,
      CLI_DATANASC,
      CLI_FONE,
      CLIENTE_E,
    } = body;

    const hasCpf = await this.clientRepository.find({
      CLI_CNPJ_CPF: normalizeCpfCnpj(CLI_CNPJ_CPF),
    });

    const hasId = await this.clientRepository.findOne(CLI_ID);

    if (CLI_ID === 0 && hasCpf[0]) {
      return { message: 'Este CPF/CNPJ já foi cadastrado.' };
    }

    if (!hasId && CLI_ID != 0) {
      return { message: 'Cliente não encontrado.' };
    }

    const client = {
      CLI_ID,
      CLI_NOME: normalizeName(CLI_NOME),
      CLI_FONE: normalizePhone(CLI_FONE),
      CLI_CNPJ_CPF: normalizeCpfCnpj(CLI_CNPJ_CPF),
      CLI_DATANASC: normalizeDate(CLI_DATANASC),
      CLIENTE_E,
    };

    await queryRunner.startTransaction();

    try {
      const clientCreated = this.clientRepository.create(client);
      return await this.clientRepository.save(clientCreated);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async index(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: ['CLIENTE_E'],
    });
  }

  async findOne(id: string): Promise<any> {
    const CLI_ID = id;
    const hasClient = await this.clientRepository.findOne(CLI_ID, {
      relations: ['CLIENTE_E'],
    });
    return hasClient ? hasClient : { message: 'Nenhum cliente encontrado.' };
  }

  async update(id: string, body: any): Promise<any> {
    const { CLI_NOME, CLI_CNPJ_CPF, CLI_DATANASC, CLI_FONE } = body;

    const hasCpf = await this.clientRepository.findOne(CLI_CNPJ_CPF);

    if (hasCpf) {
      return { message: 'Este CPF/CNPJ já foi cadastrado.' };
    }

    const x = await getConnection()
      .createQueryBuilder()
      .update(Client)
      .set({
        CLI_NOME: normalizeName(CLI_NOME),
        CLI_FONE: normalizePhone(CLI_FONE),
        CLI_CNPJ_CPF: normalizeCpfCnpj(CLI_CNPJ_CPF),
        CLI_DATANASC: normalizeDate(CLI_DATANASC),
      })
      .where({ CLI_ID: id })
      .execute();

    return x;
  }

  async delete(id: string): Promise<any> {
    try {
      const x = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Client)
        .where({ CLI_ID: id })
        .execute();

      return x.affected > 0
        ? { message: 'O cliente foi excluido com sucesso.' }
        : { message: 'Nenhum cliente foi excluido, verifique o id' };
    } catch (e) {
      return { message: 'Não foi possivel excluir o cliente, verifique o id.' };
    }
  }
}
