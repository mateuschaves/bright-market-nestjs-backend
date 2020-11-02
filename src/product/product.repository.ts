import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
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
}