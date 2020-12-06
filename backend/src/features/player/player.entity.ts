import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Game from '../game/game.entity';

export type PlayerId = string;
export type PlayerState = 'INIT' | 'ACTIVE';
export type PlayerName = string;
export type PlayerPassword = string;
export type PlayerWish = string;
export type PlayerTaboo = string;

@Entity()
export default class Player {
  @PrimaryGeneratedColumn('uuid')
  id: PlayerId;
  @Column()
  playerState: PlayerState = 'INIT';
  @Column()
  name: PlayerName = '';
  @Column({ nullable: true, default: null })
  password: PlayerPassword;
  @Column()
  wish: PlayerWish = '';
  @Column()
  taboo: PlayerTaboo = '';
  @Column({ nullable: true, default: null })
  targetId: PlayerId;
  @ManyToOne(() => Game, (game) => game.players)
  game: Game;
}
