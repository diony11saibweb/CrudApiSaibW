import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './../Services/app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/query*')
  getForParams(@Query('search') search): string | Promise<any> {
    return this.appService.getForParams(search);
  }

  @Get('/report')
  getAll(): string | Promise<any> {
    return this.appService.index();
  }

  @Get('/report/:id')
  getOne(@Param('id') id: string): string | Promise<any> {
    return this.appService.findOne(id);
  }
}
