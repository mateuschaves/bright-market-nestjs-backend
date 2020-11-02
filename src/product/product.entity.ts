import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("decimal", { precision: 5, scale: 2 })
    price: number;

    @Column()
    bar_code: string;

    @Column()
    image_uri: string;

    @Column()
    description: string;

}