import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SigninModule } from '../src/signin/signin.module';
import { SignUpDto } from '../src/signup/dto/signup.dto';
import { SignupService } from '../src/signup/signup.service';
import { AppModule } from '../src/app.module';

const mockUser: SignUpDto = {
    "name": "Alo",
    "email": "mateushenri@gmail.com",
    "password": "Keila301@mat"
}

describe('SignupController (e2e)', () => {
  let app: INestApplication;

  const signinService = { signup: () => mockUser }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SigninModule],
    })
        .overrideProvider(SignupService)
        .useValue(signinService)
        .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to create a user', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send(mockUser)
      .expect(201)
      .expect(mockUser);
  });

  afterAll( async () => {
      await app.close();
  })
});
