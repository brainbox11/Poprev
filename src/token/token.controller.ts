import { Controller, Body, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';
import { TokenService } from './token.service';
import { SellTokenDto } from './dto/sell-token.dto';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('buy')
  async buyToken(@Body() data: CreateTransactionDto) {
    return this.tokenService.buyToken(data);
  }

  @Post('sell')
  async sellToken(@Body() data: SellTokenDto) {
    return this.tokenService.sellToken(data);
  }
}

