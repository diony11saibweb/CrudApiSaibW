import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './Controllers/app.controller';
import { ClientController } from './Controllers/client.controller';
import { AddressController } from './Controllers/address.controller';
import { AppService } from './Services/app.service';
import { ClientService } from './Services/client.service';
import { AddressService } from './Services/address.service';
import Client from './Entities/client.entity';
import Address from './Entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Address])],
  controllers: [ClientController, AddressController, AppController],
  providers: [ClientService, AddressService, AppService],
})
export class crudModule {}
