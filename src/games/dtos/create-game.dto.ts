import { IsNotEmpty, MaxLength, IsString, IsOptional } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty({ message: 'Informe o nome do jogo' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty({ message: 'Informe a descrição do jogo' })
  @IsString()
  @MaxLength(200, {
    message: 'A descrição deve conter até 300 caracteres',
  })
  bio: string;

  @IsNotEmpty({ message: 'Informe o ano de lançamento' })
  @IsString()
  ano_lancamento: number;
}
