import { UserEntity } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput, UpdateUserInput } from './dto/input';
import { UserDto } from './dto/user.dto';
import { RoleEntity } from '../roles/role.entity';

export class UserMapper {
  public static toDto(entity: UserEntity): UserDto {
    return { ...entity };
  }

  public static toCreateEntity(inputData: CreateUserInput): UserEntity {
    const roles = inputData.roleIds.map((id) => {
      return Object.assign(new RoleEntity(), { id });
    });

    return Object.assign(new UserEntity(), {
      id: uuidv4(),
      ...inputData,
      roles,
    });
  }

  public static toUpdateEntity(inputData: UpdateUserInput): UserEntity {
    const roles = inputData.roleIds.map((id) => {
      return Object.assign(new RoleEntity(), { id });
    });

    return Object.assign(new UserEntity(), {
      ...inputData,
      roles,
    });
  }
}
