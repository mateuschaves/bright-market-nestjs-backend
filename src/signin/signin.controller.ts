import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SignInDto } from './dto/signin.dto';

@Controller('signin')
export class SigninController {

    constructor(
        private signinService: SigninService
    ) {}

    @Post('')
    async signin(
        @Body() signUpDto: SignInDto
    ) {
        return this.signinService.signin(signUpDto);
    }
}
