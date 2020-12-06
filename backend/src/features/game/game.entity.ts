import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Player from '../player/player.entity';

export type GameId = string;
export type RegistrationId = string;
export type GamePassword = string;
export type GameTitle = string;
export type GameDescription = string;
export type GameState = 'INIT' | 'RUN' | 'ENDED';

@Entity()
export default class Game {
  @PrimaryGeneratedColumn('uuid')
  id: GameId;
  @Column()
  registrationId: RegistrationId;
  @Column()
  title: GameTitle = '';
  @Column()
  description: GameDescription = '';
  @Column({ nullable: true, default: null })
  password: GamePassword;
  @Column()
  gameState: GameState = 'INIT';
  @OneToMany(() => Player, (player) => player.game)
  players: Player[];
}
