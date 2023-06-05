import { IsNumber, IsNumberString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumberString()
  userId: number;

  @IsNumberString()
  projectId: number;

  @IsNumberString()
  amount: number;
}
