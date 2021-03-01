import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './Controllers/client.controller';
import { ClientService } from './Services/client.service';
import { AppController } from './Controllers/app.controller';
import { AppService } from './Services/app.service';
import Client from './Entities/client.entity';
import Address from './Entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Address])],
  controllers: [ClientController, AppController],
  providers: [ClientService, AppService],
})
export class crudModule {}
