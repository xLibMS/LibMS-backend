import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let authorized = false;
    const authorizedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!authorizedRoles) {
      authorized = true;
    }
    const { user } = context.switchToHttp().getRequest();
    authorizedRoles.forEach((authorizedRole) => {
      if (user.role === authorizedRole) {
        authorized = true;
      }
    });
    return authorized;
  }
}
