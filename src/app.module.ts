import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { crudModule } from './Modulos/Crud/crud.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      name: 'default',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME_BD,
      password: process.env.PWDBD,
      database: process.env.DATABASE,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      connectString: process.env.CONNECTION_STRING,
    }),
    crudModule,
  ],
})
export class AppModule {}
