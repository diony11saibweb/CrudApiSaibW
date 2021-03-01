import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

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
    // crudModule,
  ],

  providers: [AppService],
})
export class AppModule {}
