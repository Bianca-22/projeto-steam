import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { GameRepository } from './games.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
