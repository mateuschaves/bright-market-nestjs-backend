import { Test } from "@nestjs/testing";
import { SignUpRepository } from './signup.repository';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { User } from "../common/User.entity";
import * as bcrypt from 'bcrypt';
import { SignUpDto } from "./dto/signup.dto";

const mockUser: SignUpDto = {  
    name: 'ALo',
    email: 'mateus@gmail.com',
    password: 'Keila301@mateus'
};

describe('SignUpRepository', () => {

    let signupRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                SignUpRepository
            ]
        }).compile();

        signupRepository = await module.get<SignUpRepository>(SignUpRepository);
    });

    describe('signUp', () => {

        let save;
        beforeEach(() => {
            save = jest.fn();
            signupRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('successfully signs up the user', () => {
            save.mockResolvedValue({});
            expect(signupRepository.signUp(mockUser)).resolves.not.toThrow();
        })

        it('throws a conflict exception as username already exists', () => {
            save.mockRejectedValue({ code: '23505' });
            expect(signupRepository.signUp(mockUser)).rejects.toThrow(ConflictException);
        });

        it('throws a internal server error exception on ungandled errors', () => {
            save.mockRejectedValue({ code: '32505' });
            expect(signupRepository.signUp(mockUser)).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('validateUserPassword', () => {

        let user;

        beforeEach(() => {
            signupRepository.findOne = jest.fn();

            user = new User();
            user.email = mockUser.email;
            user.name = mockUser.name;
            user.password = mockUser.password;
            user.validatePassword = jest.fn();
        });

        it('returns the username as validation is successfull', async () => {
            signupRepository.findOne.mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(true);

            const result = await signupRepository.validateUserPassword(mockUser);
            expect(result).toEqual(mockUser.email);
        });

        it('returs null as user cannot be found', async () => {
            signupRepository.findOne.mockResolvedValue(null);
            const result = await signupRepository.validateUserPassword(mockUser);
            expect(user.validatePassword).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('returns null as password is invalid', async () => {
            signupRepository.findOne.mockResolvedValue(user);
            user.validatePassword.mockResolvedValue(false);
            const result = await signupRepository.validateUserPassword(mockUser);

            expect(result).toBeNull();
        });
    })
});