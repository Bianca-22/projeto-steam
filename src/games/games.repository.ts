import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from './games.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { name, image, bio, ano_lancamento } = createGameDto;

    const game = this.create();

    game.name = name;
    game.image = image;
    game.bio = bio;
    game.ano_lancamento = ano_lancamento;

    try {
      await game.save();
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o jogo no banco de dados',
      );
    }
  }
}
