import { Test, TestingModule } from '@nestjs/testing';
import { SignUpDto } from './dto/signup.dto';
import { SignupController } from './signup.controller';
import { SignUpRepository } from './signup.repository';
import { SignupService } from './signup.service';

const mockUser: SignUpDto = {
  name: 'Mateus Henrique',
  email: 'mateushenriquechaves1@gmail.com',
  password: '123456'
}

const mockSignupRepository = () => ({
  signup: jest.fn(),
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn()
});

describe('SignupController', () => {
  let controller: SignupController;
  let signupService: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignupController],
      providers: [SignupService, {
          provide: SignUpRepository, useFactory: mockSignupRepository
      }],

    }).compile();

    controller = await module.get<SignupController>(SignupController);
    signupService = await module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const result: any = mockUser;

    jest.spyOn(signupService, 'signup').mockImplementation(() => result);
    
    expect(await controller.signup(mockUser)).toBe(result);
  })
});
