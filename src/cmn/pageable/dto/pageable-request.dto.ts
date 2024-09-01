import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum EOrderPagintaion {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageableRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsEnum(EOrderPagintaion)
  @IsOptional()
  order?: EOrderPagintaion;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  q?: string;

  constructor() {
    this.page = 1;
    this.order = EOrderPagintaion.ASC;
    this.limit = 10;
    this.q = '';
  }
}
