import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const category = this.create();
    category.name = name;

    try {
      await category.save();
      return category;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Categoria Já cadastrada');
      } else {
        throw new InternalServerErrorException('Erro ao cadastrar categoria');
      }
    }
  }
}