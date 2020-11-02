import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('')
    @UsePipes(ValidationPipe)
    async newProduct(
        @Body() createProductDto: CreateProductDto
    ) {
        return this.productService.newProduct(createProductDto);
    }

}
