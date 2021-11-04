import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './categories.repository';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async deleteCategory(categoryId: number) {
    const result = await this.categoryRepository.delete({ id: categoryId });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado uma categoria com o ID informado',
      );
    }
  }
}