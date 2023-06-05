import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: { sub: number, username: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        delete user.password
        
        return user;
    }
}