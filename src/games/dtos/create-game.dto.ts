import { IsNotEmpty, MaxLength, IsString, IsNumber } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty({ message: 'Informe o nome do jogo' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Informe o endereco da imagem' })
  @MaxLength(200, {
    message: 'O endereco da imagem deve ter menos de 200 carcateres',
  })
  imagem: string;

  @IsNotEmpty({ message: 'Insira um pequeno resumo do jogo' })
  @MaxLength(200, {
    message: 'O resumo deve ter menos de 200 carcateres',
  })
  bio: string;

  @IsNotEmpty({ message: 'Informe a data de lançamento' })
  @MaxLength(10, {
    message: 'A data de lançamento deve ter no mínimo 10 carcateres',
  })
  data_lancamento: string;

  @IsNotEmpty()
  @IsNumber()
  categoria?: number;

  @IsNumber()
  curtidas: number;
}
