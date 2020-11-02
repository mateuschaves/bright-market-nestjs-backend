import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository
    ) {}

    async newProduct(createProductDto: CreateProductDto) {
        return this.productRepository.newProduct(createProductDto);
    }
}
