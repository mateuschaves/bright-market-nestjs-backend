import { Injectable } from '@nestjs/common';
import { SignUpRepository } from './signup.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/User.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class SignupService {
    constructor (
        @InjectRepository(SignUpRepository) private readonly signUpRepository: SignUpRepository 
    ) {}

    async signup(signUpDto: SignUpDto): Promise<User> {
        return this.signUpRepository.signUp(signUpDto);
    }
}
