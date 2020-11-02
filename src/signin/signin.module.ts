import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { SignInRepository } from './signin.repository';

import * as config from 'config';

const jwtConfig: any = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      }
    }),
    TypeOrmModule.forFeature([SignInRepository]),
  ],
  controllers: [SigninController],
  providers: [SigninService, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class SigninModule {}
