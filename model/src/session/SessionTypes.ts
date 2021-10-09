export type Pin = string;
export type Id = string;
export type AuthenticationState =
  | 'SHOULD_CHECK_SESSION'
  | 'SHOULD_LOGIN'
  | 'SHOULD_LOGIN_WITH_PIN'
  | 'AUTHENTICATED'
  | 'WAS_INCORRECT_PIN'
  | 'WAS_AUTHENTICATE_ERROR';
