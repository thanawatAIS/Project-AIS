import { Role } from '../roles/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'The role you want to assign',
  })
  role: Role;
}
