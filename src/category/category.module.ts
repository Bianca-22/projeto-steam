import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
