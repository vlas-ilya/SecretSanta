import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerDto } from '../../../player/model/dto/PlayerDto';

@Entity('game')
export class GameDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  registrationId: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: true, default: null })
  password: string;

  @Column({ default: 'INIT' })
  state: string = 'INIT';

  @OneToMany(() => PlayerDto, (player) => player.game)
  players: PlayerDto[];

  @Column({ default: false })
  hasPassword: boolean;
}
