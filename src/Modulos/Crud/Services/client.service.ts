import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, createQueryBuilder } from 'typeorm';
import Client from './../Entities/client.entity';
import {
  normalizeName,
  normalizeCpfCnpj,
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

    const today = new Date().toLocaleDateString();
    console.log(today);
    // const nasc = Date.parse(CLI_DATANASC);

    const client = {
      CLI_ID: next[0].ID,
      CLI_NOME: normalizeName(CLI_NOME),
      CLI_DATACAD: new Date(today),
      CLI_FONE,
      CLI_CNPJ_CPF: normalizeCpfCnpj(CLI_CNPJ_CPF),
      CLI_DATANASC: new Date(CLI_DATANASC),
    };

    const newClient = this.clientRepository.create(client);
    // return await this.clientRepository.save(newClient);

    return {
      newClient,
    };
  }

  index(): string {
    return 'Cliente Route!';
  }

  update(): string {
    return 'Cliente Atualizado!';
  }
  delete(): string {
    return 'Cliente Excluido!';
  }
}
