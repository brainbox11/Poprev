import { IsNumber, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class SellTokenDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  projectId: number;

  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsNumber()
  @Type(() => Number)
  tokenId: number;
}
