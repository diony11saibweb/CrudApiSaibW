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

@Controller('clients/:client/adresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/')
  getAll(): Promise<Address[]> {
    return this.addressService.index();
  }
}
