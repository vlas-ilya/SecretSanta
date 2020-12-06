import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Player, {
  PlayerId,
  PlayerName,
  PlayerPassword,
  PlayerState,
  PlayerTaboo,
  PlayerWish,
} from './PlayerTypes';

import GameDto from './GameDto';

@Entity('player')
export default class PlayerDto implements Player {
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

  @ManyToOne(() => GameDto, (game) => game.players)
  game: GameDto;
}
