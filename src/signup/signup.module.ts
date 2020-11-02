import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpRepository } from './signup.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SignUpRepository]),
  ],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule {}
