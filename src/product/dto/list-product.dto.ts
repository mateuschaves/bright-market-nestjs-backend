import { IsNumber } from "class-validator";

export class ListProductDto {
    @IsNumber()
    page: number;

    @IsNumber()
    limit: number;
}