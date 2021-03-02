import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
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
  getAll(): Promise<Client[]> {
    return this.clientService.index();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): string | Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: any): Promise<Client> {
    return this.clientService.update(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): any {
    return this.clientService.delete(id);
  }
}
