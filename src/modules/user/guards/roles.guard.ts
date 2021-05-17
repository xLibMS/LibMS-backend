import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authorizedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const { user } = context.switchToHttp().getRequest();

    return authorizedRoles ? authorizedRoles.includes(user.role) : true;
  }
}
