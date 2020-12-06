import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Game, {
  GameDescription,
  GameId,
  GamePassword,
  GameState,
  GameTitle,
  RegistrationId,
} from './GameTypes';

import PlayerDto from './PlayerDto';

@Entity('game')
export default class GameDto implements Game {
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

  @OneToMany(() => PlayerDto, (player) => player.game)
  players: PlayerDto[];

  @Column({ default: false })
  hasPassword: boolean;
}
