import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Player, {
  PlayerId,
  PlayerName,
  PlayerPassword,
  PlayerState,
  PlayerTaboo,
  PlayerWish,
} from './PlayerTypes';

import GameEntity from './GameEntity';

@Entity('player')
export default class PlayerEntity implements Player {
  @PrimaryGeneratedColumn('uuid')
  id: PlayerId;

  @Column({ default: 'INIT' })
  playerState: PlayerState = 'INIT';

  @Column({ default: '' })
  name: PlayerName = '';

  @Column({ nullable: true, default: null })
  password: PlayerPassword;

  @Column({ default: '' })
  wish: PlayerWish = '';

  @Column({ default: '' })
  taboo: PlayerTaboo = '';

  @Column({ nullable: true, default: null })
  targetId: PlayerId;

  @ManyToOne(() => GameEntity, (game) => game.players)
  game: GameEntity;

  @Column({ default: false })
  hasPassword: boolean;
}
