import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import Address from './../Entities/address.entity';
import {
  normalizeName,
  normalizeCep,
  normalizeUf,
} from './../../../utils/normalizeEnties';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async store(@Body() body: Address): Promise<any> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const {
      CLIE_ID = 0,
      CLIE_CLI_ID,
      CLIE_BAIRRO,
      CLIE_CEP,
      CLIE_CIDADE,
      CLIE_ENDERECO,
      CLIE_TIPO,
      CLIE_UF,
    } = body;

    const hasId = await this.addressRepository.findOne(CLIE_ID);

    if (!hasId && CLIE_ID != 0) {
      return { message: 'Cliente não encontrado.' };
    }

    const address = {
      CLIE_ID,
      CLIE_CLI_ID,
      CLIE_BAIRRO: normalizeName(CLIE_BAIRRO),
      CLIE_CEP: normalizeCep(CLIE_CEP),
      CLIE_CIDADE: normalizeName(CLIE_CIDADE),
      CLIE_ENDERECO: normalizeName(CLIE_ENDERECO),
      CLIE_TIPO: CLIE_TIPO,
      CLIE_UF: normalizeUf(CLIE_UF),
    };

    await queryRunner.startTransaction();

    try {
      const clientCreated = this.addressRepository.create(address);
      return await this.addressRepository.save(clientCreated);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async index(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  async findOne(id: string): Promise<any> {
    const CLIE_ID = id;
    const hasClient = await this.addressRepository.findOne(CLIE_ID);
    return hasClient ? hasClient : { message: 'Nenhum endereço encontrado.' };
  }

  async delete(id: string): Promise<any> {
    try {
      const x = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Address)
        .where({ CLIE_ID: id })
        .execute();

      return x.affected > 0
        ? { message: 'O endereço foi excluido com sucesso.' }
        : { message: 'Nenhum endereço foi excluido, verifique o id' };
    } catch (e) {
      return {
        message: 'Não foi possivel excluir o endereço, verifique o id.',
      };
    }
  }
}
