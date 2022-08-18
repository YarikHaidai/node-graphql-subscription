import { RoleDto } from './dto/role.dto';
import { RoleEntity } from './role.entity';

export class RoleMapper {
  public static toDto(entity: RoleEntity): RoleDto {
    return { ...entity };
  }
}
