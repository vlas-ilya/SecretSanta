import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

import Game from '../game/game.entity';

export type PlayerId = string;
export type PlayerState = 'INIT' | 'ACTIVE';
export type PlayerName = string;
export type PlayerWish = string;
export type PlayerDontWish = string;

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class Player {
  @PrimaryGeneratedColumn('uuid') id: PlayerId;
  @Column() playerState: PlayerState = 'INIT';
  @Column() name: PlayerName = '';
  @Column() wish: PlayerWish = '';
  @Column() dontWish: PlayerDontWish = '';
  @Column() targetId: PlayerId;

  @ManyToOne(() => Game, (game) => game.players)
  game: Game;
}
