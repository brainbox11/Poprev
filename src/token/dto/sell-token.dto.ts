import { IsNumber } from 'class-validator';

export class SellTokenDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  projectId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  tokenId: number;
}
