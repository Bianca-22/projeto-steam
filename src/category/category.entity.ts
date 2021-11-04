import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
  
@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
@PrimaryGeneratedColumn('increment')
id: number;

@Column({ nullable: false, type: 'varchar', length: 200 })
name: string;
}