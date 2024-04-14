import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  limit: number = 10;
}