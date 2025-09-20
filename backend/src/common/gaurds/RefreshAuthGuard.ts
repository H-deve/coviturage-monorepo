import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, utilisateur, info) {
    if (err || !utilisateur) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return utilisateur;
  }
}
