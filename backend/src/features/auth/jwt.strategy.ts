import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          let data = request?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload: { id: string }) {
    return { id: payload.id };
  }
}
