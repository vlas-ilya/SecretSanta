export const GAME_TITLE_MIN_LENGTH = 5;
export const GAME_TITLE_MAX_LENGTH = 255;
export const GAME_TITLE_ERROR_MESSAGE = `Заголовок должен занимать от ${GAME_TITLE_MIN_LENGTH} до ${GAME_TITLE_MAX_LENGTH} символов`;

export const GAME_DESCRIPTION_MIN_LENGTH = 5;
export const GAME_DESCRIPTION_MAX_LENGTH = 1000;
export const GAME_DESCRIPTION_ERROR_MESSAGE = `Описание должно занимать от ${GAME_DESCRIPTION_MIN_LENGTH} до ${GAME_DESCRIPTION_MAX_LENGTH} символов`;

export const GAME_CHANGE_PIN_MIN_LENGTH = 4;
export const GAME_CHANGE_PIN_MAX_LENGTH = 8;
export const GAME_CHANGE_PIN_ERROR_MESSAGE = `Пин-код должен содержать от ${GAME_CHANGE_PIN_MIN_LENGTH} до ${GAME_CHANGE_PIN_MAX_LENGTH} символов`;
export const GAME_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE =
  'Пин-коды не совпадают';
