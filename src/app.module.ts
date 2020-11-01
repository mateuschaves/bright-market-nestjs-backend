import { Module } from '@nestjs/common';
import { SigninModule } from './signin/signin.module';

@Module({
  imports: [SigninModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
