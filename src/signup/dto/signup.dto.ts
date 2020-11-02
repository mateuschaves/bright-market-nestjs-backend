import { IsNotEmpty, MinLength, MaxLength, IsString, Matches } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: 'Sua senha não é forte o suficiente'
        })
    password: string;


    @IsString()
    @MaxLength(5)
    name: string;
}