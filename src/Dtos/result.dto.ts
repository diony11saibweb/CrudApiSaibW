import { ApiProperty } from '@nestjs/swagger';

export class ResultDto {
  constructor(
    public message: string,

    public success: boolean,

    public retorno: any,

    public errors: any,
  ) {}
}
