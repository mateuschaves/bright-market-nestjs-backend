import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { URLSearchParams } from 'url';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductDto } from './dto/list-product.dto';
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

    @Get('')
    async listProduct(
        @Query() listProductDto: ListProductDto
    ) {
        return this.productService.listProduct(listProductDto);
    }

    @Get(':id')
    async viewProduct(
        @Param('id') id: number
    ) {
        return this.productService.viewProduct(id);
    }

}
