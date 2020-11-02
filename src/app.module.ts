import { Module } from '@nestjs/common';
import { SigninModule } from './signin/signin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
    SigninModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    SignupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
