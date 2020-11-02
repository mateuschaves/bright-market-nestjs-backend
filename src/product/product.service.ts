import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { ListProductDto } from './dto/list-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository
    ) {}

    async newProduct(createProductDto: CreateProductDto) {
        return this.productRepository.newProduct(createProductDto);
    }

    async listProduct(listProductDto: ListProductDto) {
        return this.productRepository.listProduct(listProductDto);
    }

    async viewProduct(id: number) {
        return this.productRepository.viewProduct(id);
    }
}
