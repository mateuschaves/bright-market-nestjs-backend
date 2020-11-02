import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import { SignInRepository } from './signin.repository';

@Injectable()
export class SigninService {

    constructor(
        @InjectRepository(SignInRepository)
        private signinRepository: SignInRepository,
        private jwtService: JwtService
    ) { }
    
    async signin(signInDto: SignInDto) {
        const user = await this.signinRepository.validateUserPassword(signInDto);

        if (!user) {
            throw new UnauthorizedException('Login ou senha incorretos');
        }

        const payload: JwtPayload = { id: user.id };

        const accessToken = this.jwtService.sign(payload);

        delete user.password;
        delete user.salt;
        
        return { ...user, accessToken }
    }
}
