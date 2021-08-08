import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GameDto } from '../../../game/model/dto/GameDto';

@Entity('player')
export class PlayerDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'INIT' })
  state: string = 'INIT';

  @ManyToOne(() => GameDto, (game) => game.players)
  game: GameDto;

  @Column({ default: '' })
  name?: string;

  @Column({ nullable: true, default: null })
  password?: string;

  @Column({ default: '' })
  wish?: string;

  @Column({ default: '' })
  taboo?: string;

  @ManyToOne(() => PlayerDto, (player) => player.id, { nullable: true })
  target?: PlayerDto;
}
