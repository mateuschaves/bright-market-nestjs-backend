import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import { SignUpRepository } from './signup.repository';

const mockSignupRepository = () => ({
  signup: jest.fn(),
});

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignupService, {
        provide: SignUpRepository, useFactory: mockSignupRepository
      }],
    }).compile();

    service = await module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
