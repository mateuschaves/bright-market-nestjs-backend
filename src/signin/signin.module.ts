import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';

@Module({
  controllers: [SigninController]
})
export class SigninModule {}
