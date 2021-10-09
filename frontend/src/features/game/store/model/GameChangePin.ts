import { IsDecimal, IsNotEmpty, IsOptional, Length } from 'class-validator';

import { GamePin } from './GameTypes';
import { Match } from '../../../../utils/matchDecorator';

export class GameChangePin {
  constructor(newPin: GamePin, confirmation: GamePin, oldPin?: GamePin) {
    if (oldPin && oldPin.length > 0) {
      this.oldPin = oldPin;
    }
    this.newPin = newPin;
    this.confirmation = confirmation;
  }

  static build(newPin: GamePin, confirmation: GamePin, oldPin?: GamePin): GameChangePin {
    return new GameChangePin(newPin, confirmation, oldPin);
  }

  @IsOptional()
  @IsDecimal()
  @Length(4, 8, {
    message: 'Пинкод должен сожержать от 4 до 8 символов',
  }) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  oldPin?: GamePin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(4, 8, {
    message: 'Пинкод должен сожержать от 4 до 8 символов',
  }) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  newPin: GamePin;

  @IsNotEmpty()
  @IsDecimal()
  @Match('newPin', {
    message: 'Пинкоды не совпадают',
  })
  @Length(4, 8, {
    message: 'Пинкод должен сожержать от 4 до 8 символов',
  }) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  confirmation: GamePin;
}
