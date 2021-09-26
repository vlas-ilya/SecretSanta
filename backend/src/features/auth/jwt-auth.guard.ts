import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    const username =
      context.getRequest().url.split('/')[3] || context.getRequest().body.username;
    if (username !== user.id) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
