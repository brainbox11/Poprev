import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArtistModule } from './artist/artist.module';
import { ProjectModule } from './project/project.module';
import { TokenModule } from './token/token.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, ArtistModule, ProjectModule, TokenModule, TransactionModule, PrismaModule],
})
export class AppModule {}
