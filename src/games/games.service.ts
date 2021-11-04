import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from './dtos/create-game.dto';
import { FindGamesQueryDto } from './dtos/find-games-query.dto';
import { Game } from './games.entity';
import { GameRepository } from './games.repository';

@Injectable()
export class GamesService {
    constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createGame(createGameDto);
  }
  async findGameById(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findOne(gameId, {
      select: ['name', 'bio', 'imagem', 'data_lancamento', 'curtidas', 'id'],
    });
    console.log(game);

    if (!game) throw new NotFoundException('jogo não encontrado');

    return game;
  }

  async updateGame(updateGameDto: CreateGameDto, id: string): Promise<Game> {
    const game = await this.findGameById(id);

    const { name, bio, imagem, data_lancamento } = updateGameDto;

    game.name = name ? name : game.name;
    game.bio = bio ? bio : game.bio;
    game.imagem = imagem ? imagem : game.imagem;
    game.data_lancamento = data_lancamento
      ? data_lancamento
      : game.data_lancamento;

    try {
      await game.save();
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar dados no banco de dados',
      );
    }
  }

  async deleteGame(gameId: string) {
    const result = await this.gameRepository.delete({ id: gameId });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um jogo com o ID informado',
      );
    }
  }

  async findGames(
    queryDto: FindGamesQueryDto,
  ): Promise<{ games: Game[]; total: number }> {
    const games = await this.gameRepository.findGames(queryDto);
    return games;
  }
}
