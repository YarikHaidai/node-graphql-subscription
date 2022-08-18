import { RoleDto } from '../../roles/dto/role.dto';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  phone: string;
  roles: RoleDto[];
  createdAt: string;
  updatedAt: string;
}
