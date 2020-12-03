import { ChildEntity, Column, JoinTable, ManyToOne, OneToMany } from 'typeorm';

import Player from '../player/player.entity';

export type RegistrationId = string;
export type GameState = 'INIT' | 'RUN' | 'ENDED';
export type GameDocument = Game & Document;

@ChildEntity()
export default class Game extends Player {
  @Column() registrationId: RegistrationId;
  @Column() gameState: GameState = 'INIT';

  @OneToMany(() => Player, (player) => player.game)
  @JoinTable()
  players: Player[];
}
