import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInRepository } from './signin.repository';
import { User } from '../common/User.entity';

import * as config from 'config';
const jwtConfig: any = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(SignInRepository)
        private signinRepository: SignInRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secret,

        });
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload;

        const user = await this.signinRepository.findOne({ 
            where: { 
                id
            }
         });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}