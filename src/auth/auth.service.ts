import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: AuthDto) {
        // generate the password hash
        const password = await argon.hash(dto.password);

        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    password,
                },
            });
    
            //return saved user
            return this.signToken(user.id, user.username);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    )
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        // find user by username
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username
            }
        });
        // if user does not exist throw exception
        if (!user) {
            throw new ForbiddenException(
                'Credentials incorrect',
            )
        }

        // compare password
        const pwMatches = await argon.verify(user.password, dto.password)
        // if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException(
                'Credentials incorrect',
            )
        }

        // send back the user
        return this.signToken(user.id, user.username);
    }

    async signToken(userId: number, username: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            username
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '50m',
            secret: secret
        });

        return {
            access_token: token
        }
    }
}
