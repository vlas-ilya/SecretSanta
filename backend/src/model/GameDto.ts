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

  @OneToMany(() => PlayerDto, (player) => player.game)
  players: PlayerDto[];
}
