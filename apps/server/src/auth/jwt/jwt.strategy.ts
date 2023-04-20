import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { INVALID_JWT_TOKEN } from '../../shared/messages';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT.SECRET')
        });
    }

    async validate(payload: any) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: payload.sub,
                email: payload.email,
                role: payload.role
            }
        });

        if (!user) throw new UnauthorizedException(INVALID_JWT_TOKEN);

        return omit(user, 'password');
    }
}
