import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Game, {
  GameDescription,
  GameId,
  GamePassword,
  GameState,
  GameTitle,
  RegistrationId,
} from './GameTypes';

import PlayerEntity from './PlayerEntity';

@Entity('game')
export default class GameEntity implements Game {
  @PrimaryGeneratedColumn('uuid')
  id: GameId;

  @Column({ default: '' })
  registrationId: RegistrationId;

  @Column({ default: '' })
  title: GameTitle = '';

  @Column({ default: '' })
  description: GameDescription = '';

  @Column({ nullable: true, default: null })
  password: GamePassword;

  @Column({ default: 'INIT' })
  gameState: GameState = 'INIT';

  @OneToMany(() => PlayerEntity, (player) => player.game)
  players: PlayerEntity[];

  @Column({ default: false })
  hasPassword: boolean;
}
