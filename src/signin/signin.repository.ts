import { Repository, EntityRepository } from "typeorm";
import { User } from '../common/User.entity';
import { SignInDto } from './dto/signin.dto';

@EntityRepository(User)
export class SignInRepository extends Repository<User> {

    async validateUserPassword(signinDto: SignInDto): Promise<User> {
        const { email, password } = signinDto;

        try {
            const user = await this.findOne({ where: {email} });

            if (user && await user.validatePassword(password)) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}