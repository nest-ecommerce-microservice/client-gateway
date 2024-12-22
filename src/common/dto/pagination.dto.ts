import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  public page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  public limit?: number = 10;
}
