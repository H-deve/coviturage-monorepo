import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
    
  }

  handleRequest(err, utilisateur, info) {
    if (err || !utilisateur) {
      throw err || new UnauthorizedException();
    }
    return utilisateur;
  }
}
