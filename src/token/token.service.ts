import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';
import { SellTokenDto } from './dto/sell-token.dto';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async buyToken(data: CreateTransactionDto) {
    const { userId, projectId, amount } = data;

    // Create tokens for the user
    const token = await this.prisma.token.create({
      data: {
        projectId,
        amount,
      },
    });

    const tokenId = token.id

    // Create the buy transaction
    const buyTransaction = await this.prisma.transaction.create({
        data: {
          userId,
          tokenId,
          amount,
          transactionType: 'Buy',
          createdAt: new Date(),
        },
      });

    // Update the token amount for the associated project
    await this.prisma.project.update({
      where: { id: projectId },
      data: { amount: { increment: amount } },
    });

    return buyTransaction;
  }

  async sellToken(data: SellTokenDto) {
    const { userId, projectId, tokenId, amount } = data;

    // Create the sell transaction
    const sellTransaction = await this.prisma.transaction.create({
      data: {
        userId,
        tokenId,
        amount,
        transactionType: 'Sell',
        createdAt: new Date(),
      },
    });

    // Update the token amount for the associated project
    await this.prisma.project.update({
      where: { id: projectId },
      data: { amount: { decrement: amount } },
    });

    return sellTransaction;
  }
}