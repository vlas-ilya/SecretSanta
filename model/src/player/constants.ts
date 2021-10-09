export const PLAYER_NAME_MIN_LENGTH = 10;
export const PLAYER_NAME_MAX_LENGTH = 255;
export const PLAYER_NAME_ERROR_MESSAGE = `Поле 'Имя и Фамилия' должно занимать от ${PLAYER_NAME_MIN_LENGTH} до ${PLAYER_NAME_MAX_LENGTH} символов`;

export const PLAYER_WISH_MIN_LENGTH = 0;
export const PLAYER_WISH_MAX_LENGTH = 1000;
export const PLAYER_WISH_ERROR_MESSAGE = `Поле 'Пожелания' должно занимать не более ${PLAYER_WISH_MAX_LENGTH} символов`;

export const PLAYER_TABOO_MIN_LENGTH = 0;
export const PLAYER_TABOO_MAX_LENGTH = 1000;
export const PLAYER_TABOO_ERROR_MESSAGE = `Поле 'Не дарить ни в коем случае' должно занимать не более ${PLAYER_WISH_MAX_LENGTH} символов`;

export const PLAYER_CHANGE_PIN_MIN_LENGTH = 4;
export const PLAYER_CHANGE_PIN_MAX_LENGTH = 8;
export const PLAYER_CHANGE_PIN_ERROR_MESSAGE = `Пинкод должен сожержать от ${PLAYER_CHANGE_PIN_MIN_LENGTH} до ${PLAYER_CHANGE_PIN_MAX_LENGTH} символов`;
export const PLAYER_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE =
  'Пинкоды не совпадают';
