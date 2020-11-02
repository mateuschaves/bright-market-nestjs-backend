import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from '../common/User.entity';
import { SignUpDto } from './dto/signup.dto';

@EntityRepository(User)
export class SignUpRepository extends Repository<User> {
    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { name, email, password } = signUpDto;

        const salt = await bcrypt.genSalt();

        const user = this.create();
        user.email = email;
        user.name = name;
        user.salt = salt;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            return user;
        } catch (error) {
            if (error.code === '23505')
                throw new ConflictException('Usuário já existe');
            else
                throw new InternalServerErrorException();
        }
    }

    async validateUserPassword(signUpDto: SignUpDto): Promise<string> {
        const { email, password } = signUpDto;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }


    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}