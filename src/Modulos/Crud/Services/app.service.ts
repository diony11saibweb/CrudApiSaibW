import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import Client from './../Entities/client.entity';
import * as puppeteer from 'puppeteer';
import reportTemplete from './../../../utils/templete/render-templete';
import { uuid } from 'uuidv4';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async getForParams(search: string): Promise<any> {
    const result = await getManager().query(
      `SELECT * FROM PVDA.TCLIENTE WHERE UPPER (CLI_NOME) LIKE '%${search.toUpperCase()}%'
        OR UPPER (CLI_CNPJ_CPF) LIKE '%${search}%'
        OR UPPER (CLI_FONE) LIKE '%${search}%'`,
    );

    if (!result[0]) {
      try {
        return await getManager().query(
          `SELECT * FROM PVDA.TCLIENTE WHERE CLI_DATANASC = '${search}'`,
        );
      } catch (e) {
        return;
      }
    } else {
      return result;
    }
  }

  async index(): Promise<any> {
    const clients = await this.clientRepository.find({
      relations: ['CLIENTE_E'],
    });

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // await page.setContent('<h1>TEste</h1>');
      await page.setContent(reportTemplete(clients));
      await page.emulateMediaType('print');
      await page.pdf({ path: `documents/${uuid()}.pdf`, format: 'a4' });
      await browser.close();
    } catch (e) {
      return e;
    }

    return;
  }

  async findOne(id: string): Promise<any> {
    const CLI_ID = id;
    const hasClient = await this.clientRepository.findOne(CLI_ID, {
      relations: ['CLIENTE_E'],
    });
    return hasClient ? hasClient : { message: 'Nenhum cliente encontrado.' };
  }
}
