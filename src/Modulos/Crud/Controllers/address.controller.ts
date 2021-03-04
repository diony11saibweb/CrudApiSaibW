import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import Address from '../Entities/address.entity';
import { AddressService } from './../Services/address.service';

@Controller('adresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/')
  create(@Body() body: any): Promise<Address> {
    return this.addressService.store(body);
  }

  @Get('/:id')
  getOne(@Param('id') id: string): string | Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Get('/')
  getAll(): Promise<Address[]> {
    return this.addressService.index();
  }

  @Delete('/:id')
  delete(@Param('id') id: string): any {
    return this.addressService.delete(id);
  }
}
