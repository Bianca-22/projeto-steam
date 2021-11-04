import {
    Controller,
    Post,
    Body,
    Param,
    ValidationPipe,
    UseGuards,
    ForbiddenException,
    Delete,
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { ReturnCategoryDto } from './dto/return-category.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { RolesGuard } from 'src/auth/roles.guard';
  import { Role } from 'src/auth/role.decorator';
  import { UserRole } from '../users/user-roles.enum';
  import { User } from '../users/user.entity';
  import { GetUser } from 'src/auth/get-user.decorator';
  import { CreateCategoryDto } from './dto/create-category.dto';
  
  @Controller('category')
  @UseGuards(AuthGuard(), RolesGuard)
  export class CategoryController {
    constructor(private categoryService: CategoryService) {}
  
    @Post()
    @Role(UserRole.ADMIN)
    async createCategory(
      @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
      @GetUser() user: User,
    ): Promise<ReturnCategoryDto> {
      if (user.role != UserRole.ADMIN) {
        throw new ForbiddenException(
          'Você não tem autorização para cadastrar uma categoria',
        );
      } else {
        const category = await this.categoryService.createCategory(
          createCategoryDto,
        );
        return {
          category,
          message: 'Categoria cadastrada com sucesso',
        };
      }
    }
  
    @Delete(':id')
    async deleteCategory(@Param('id') id: number, @GetUser() user: User) {
      if (user.role != UserRole.ADMIN) {
        throw new ForbiddenException(
          'Você não tem autorização para apagar uma categoria',
        );
      } else {
        await this.categoryService.deleteCategory(id);
        return {
          message: 'categoria removida com sucesso',
        };
      }
    }
  }