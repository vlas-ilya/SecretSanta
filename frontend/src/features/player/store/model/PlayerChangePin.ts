import { IsDecimal, IsNotEmpty, IsOptional, Length } from 'class-validator';

import { Match } from '../../../../utils/matchDecorator';
import { PlayerPin } from './PlayerTypes';

export class PlayerChangePin {
  constructor(newPin: PlayerPin, confirmation: PlayerPin, oldPin?: PlayerPin) {
    if (oldPin && oldPin.length > 0) {
      this.oldPin = oldPin;
    }
    this.newPin = newPin;
    this.confirmation = confirmation;
  }

  @IsOptional()
  @IsDecimal()
  @Length(4, 8, {
    message: 'Пинкод должен сожержать от 4 до 8 символов',
  })
  oldPin?: PlayerPin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(4, 8, {
    message: 'Пинкод должен сожержать от 4 до 8 символов',
  })
  newPin: PlayerPin;

  @IsNotEmpty()
  @IsDecimal()
  @Match('newPin', {
    message: 'Пинкоды не совпадают',
  })
  @Length(4, 8, {
    message: 'Пинкод должен сожержать от 4 до 8 символов',
  })
  confirmation: PlayerPin;
}
