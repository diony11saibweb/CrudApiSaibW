import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import Client from '../Entities/client.entity';
import { ClientService } from './../Services/client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/')
  create(@Body() body: any): Promise<Client> {
    return this.clientService.store(body);
  }

  @Get('/')
  getAll(): string {
    return this.clientService.index();
  }

  @Get('/:id')
  getOne(): string {
    return this.clientService.index();
  }

  @Put('/')
  update(): string {
    return this.clientService.update();
  }
}
