import { Type } from 'class-transformer';
import { IsNumberString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  userId: number;
  
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  projectId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}
