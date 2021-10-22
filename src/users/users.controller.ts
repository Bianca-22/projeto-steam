import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
