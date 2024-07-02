// import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from './roles.enum';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   private readonly logger = new Logger(RolesGuard.name);

//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRole = this.reflector.get<Role>('roles', context.getHandler());
//     if (!requiredRole) {
//       return true; // No specific role required, access allowed
//     }

//     const { user } = context.switchToHttp().getRequest();
//     this.logger.debug(`Checking roles for user: ${JSON.stringify(user)}`);
    
//     if (!user || !user.role || user.role !== Role.Admin) {
//       this.logger.warn(`Unauthorized access for user: ${JSON.stringify(user)}`);
//       return false;
//     }

//     return true;
//   }
// }

import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>('roles', context.getHandler());
    if (!requiredRole) {
      return true; // No specific role required, access allowed
    }

    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(`Checking roles for user: ${JSON.stringify(user)}`);
    
    if (!user || !user.role || user.role !== Role.Admin) {
      this.logger.warn(`Unauthorized access for user: ${JSON.stringify(user)}`);
      return false;
    }

    return true;
  }
}
