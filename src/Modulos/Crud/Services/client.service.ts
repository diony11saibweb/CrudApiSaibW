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
    const { CLI_NOME, CLI_CNPJ_CPF, CLI_DATANASC, CLI_FONE } = body;
    const next = await this.clientRepository.query(
      `SELECT MAX(CLI_ID) + 1 as id FROM PVDA.TCLIENTE`,
    );

    const hasCpf = await this.clientRepository.findOne({
      where: { CLI_CNPJ_CPF: normalizeCpfCnpj(CLI_CNPJ_CPF) },
    });

    if (hasCpf[0]) {
      //Passar para JSON - DTOS
      return 'Este CPF/CNPJ já foi cadastrado.';
    }

    // Passar Query para a entidade Client usandos as triggers (BeforeInsert)
    // Rota de cadastro deve fazer UPDATE
    // Passar CLI_DATACAD para entidade
    // Retirar ".create()" do service
    // Adicionar Endereços juntos ao cadastro
    // Criar transaction para inserção
    // Retorno deve passar pelo DTOS

    next[0].ID === null ? (next[0].ID = 1) : null;

    const client = {
      CLI_ID: next[0].ID,
      CLI_NOME: normalizeName(CLI_NOME),
      CLI_DATACAD: normalizeDate(new Date().toLocaleDateString()),
      CLI_FONE: normalizePhone(CLI_FONE),
      CLI_CNPJ_CPF: normalizeCpfCnpj(CLI_CNPJ_CPF),
      CLI_DATANASC: normalizeDate(CLI_DATANASC),
    };

    const newClient = this.clientRepository.create(client);
    return await this.clientRepository.save(newClient);
  }

  async index(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    const hasClient = await this.clientRepository.find({
      where: { CLI_ID: id },
    });
    return hasClient[0] ? hasClient[0] : null;
  }

  async update(id: string, body: any): Promise<any> {
    const { CLI_NOME, CLI_CNPJ_CPF, CLI_DATANASC, CLI_FONE } = body;

    const hasCpf = await this.clientRepository.find({
      where: { CLI_CNPJ_CPF },
    });

    if (hasCpf[0]) {
      //Passar para JSON - DTOS
      return 'Este CPF/CNPJ já foi cadastrado.';
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
    const x = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Client)
      .where({ CLI_ID: id })
      .execute();

    return x;
  }
}
