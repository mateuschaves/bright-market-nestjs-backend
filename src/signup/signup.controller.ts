import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../common/User.entity';

@Controller('signup')
export class SignupController {

    constructor (
        private signUpService: SignupService
    ) {}

    @Post('')
    @UsePipes(ValidationPipe)
    async signup(
        @Body() signUpDto: SignUpDto
    ): Promise<User> {
       return this.signUpService.signup(signUpDto);
    }
}
