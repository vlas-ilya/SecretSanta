export type ErrorCode =
  | 'GAME_ID_IS_NULL'
  | 'GAME_ID_HAS_INCORRECT_FORMAT'
  | 'REGISTRATION_ID_IS_NULL'
  | 'GAME_STATE_IS_NULL'
  | 'GAME_DESCRIPTION_IS_NULL'
  | 'GAME_DESCRIPTION_HAS_INCORRECT_LENGTH'
  | 'GAME_TITLE_IS_NULL'
  | 'GAME_TITLE_HAS_INCORRECT_LENGTH'
  | 'GAME_PIN_IS_NULL'
  | 'GAME_PIN_HAS_INCORRECT_FORMAT'
  | 'GAME_PIN_HAS_INCORRECT_LENGTH'
  | 'GAME_PASSWORD_IS_NULL'
  | 'GAME_PASSWORD_IS_NOT_CORRECT'
  | 'GAME_CHANGES_IS_NULL'
  | 'GAME_CHANGES_IS_EMPTY'
  | 'GAME_NOT_ENOUGH_PLAYERS'
  | 'GAME_OLD_PIN_IS_NOT_CORRECT'
  | 'GAME_NEW_STATE_IS_NOT_CORRECT'
  | 'GAME_SHOULD_BE_IN_INIT_STATUS'
  | 'GAME_NOT_FOUND'
  | 'GAME_PASSWORD_IS_INCORRECT'
  | 'PLAYER_ID_IS_NULL'
  | 'PLAYER_ID_HAS_INCORRECT_FORMAT'
  | 'PLAYER_PASSWORD_IS_NULL'
  | 'PLAYER_PASSWORD_HAS_INCORRECT_FORMAT'
  | 'PLAYER_PIN_IS_NULL'
  | 'PLAYER_PIN_HAS_INCORRECT_FORMAT'
  | 'PLAYER_PIN_HAS_INCORRECT_LENGTH'
  | 'PLAYER_NAME_IS_NULL'
  | 'PLAYER_NAME_HAS_INCORRECT_LENGTH'
  | 'PLAYER_TABOO_IS_NULL'
  | 'PLAYER_TABOO_HAS_INCORRECT_LENGTH'
  | 'PLAYER_WISH_IS_NULL'
  | 'PLAYER_WISH_HAS_INCORRECT_LENGTH'
  | 'PLAYER_STATE_IS_NULL'
  | 'PLAYER_NOT_FOUND'
  | 'PLAYER_PASSWORD_IS_INCORRECT'
  | 'PLAYER_CHANGES_IS_NULL'
  | 'PLAYER_CHANGES_IS_EMPTY'
  | 'PLAYER_OLD_PIN_IS_NOT_CORRECT'
  | 'START_SHOULD_BE_NOT_NULL'
  | 'END_SHOULD_BE_NOT_NULL'
  | 'START_SHOULD_BE_GREATER_END';