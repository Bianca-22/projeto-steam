import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Informe a Categoria' })
  @MaxLength(20, {
    message: 'Categoria deve ter menos de 20 carcateres',
  })
  name: string;
}