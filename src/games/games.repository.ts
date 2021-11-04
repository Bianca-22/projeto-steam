import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateGameDto } from './dtos/create-game.dto';
import { FindGamesQueryDto } from './dtos/find-games-query.dto';
import { Game } from './games.entity';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async findGames(
    queryDto: FindGamesQueryDto,
  ): Promise<{ games: Game[]; total: number }> {
    const { name, bio, data_lancamento, imagem } = queryDto;
    const query = this.createQueryBuilder('game');
    const [games, total] = await query.getManyAndCount();

    if (bio) {
      query.andWhere('game.bio ILIKE :bio', { bio: `%${bio}%` });
    }

    if (name) {
      query.andWhere('game.name ILIKE :name', { name: `%${name}%` });
    }

    if (imagem) {
      query.andWhere('game.imagem ILIKE :imagem', { imagem: `%${imagem}%` });
    }

    if (data_lancamento) {
      query.andWhere('game.data_lancamento ILIKE :data_lancamento', {
        data_lancamento: `%${data_lancamento}`,
      });
    }

    return { games, total };
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { name, bio, imagem, data_lancamento, curtidas } = createGameDto;
    const game = this.create();
    game.bio = bio;
    game.name = name;
    game.data_lancamento = data_lancamento;
    game.curtidas = curtidas;
    game.imagem = imagem;

    try {
      await game.save();
      return game;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Jogo Já cadastrado');
      } else {
        throw new InternalServerErrorException('Erro ao cadastrar jogo');
      }
    }
  }
}
