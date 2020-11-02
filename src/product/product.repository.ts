import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ListProductDto } from "./dto/list-product.dto";
import { Product } from "./product.entity";


@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async newProduct(createProductDto: CreateProductDto) {
        const { 
            name,
            description,
            price,
            bar_code
         } = createProductDto;

         try {
             const product = this.create();
             if(product) {
                 product.description = description;
                 product.price = price;
                 product.name = name;
                 product.image_uri = "none";
                 product.bar_code = bar_code;
             }

             await product.save();

             return product;
         } catch (error) {
             throw new InternalServerErrorException('Não foi possível criar esse produto')
         }
    }

    async listProduct(listProductDto: ListProductDto) {
        const { page, limit = 20 } = listProductDto;

        const offset = 0 + (page - 1) * limit;
        const rows = await this.find({
            take: limit,
            skip: offset
        });

        return {
            rows,
            page: Number(page),
            count: rows.length,
        }
    }
}