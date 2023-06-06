import { Controller, Get, Patch, Req, UseGuards, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto,
    ) {
        return this.userService.editUser(userId, dto);
    }

    @Get(':userId/token-investments')
    async getUserTokenInvestments(
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        const userTokenInvestments = await this.userService.getUserTokenInvestments(userId);
        // return userTokenInvestments.map((token) => ({
        //   id: token.id,
        //   amount: token.amount,
        //   project: token.project,
        // }));
        return userTokenInvestments;
    }
}
