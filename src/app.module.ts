import { Module } from '@nestjs/common';
import { SigninModule } from './signin/signin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SignupModule } from './signup/signup.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    SigninModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    SignupModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
