import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    bar_code: string;
}