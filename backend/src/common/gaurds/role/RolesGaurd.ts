// filepath: /c:/Users/CDAX32/Desktop/cours CDA/soutenance4/Projet/soutencane4/covoiturage/src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../decorator/roles.decorator';
import { Role } from '../../../common/enum/role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { utilisateur } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => utilisateur.roles?.includes(role));
  }
}