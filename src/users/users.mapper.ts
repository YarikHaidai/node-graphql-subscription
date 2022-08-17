import { UserEntity } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/input';

export class UserMapper {
  public static toDto(entity: UserEntity): UserDto {
    return { ...entity };
  }

  public static toCreateEntity(inputData: CreateUserInput): UserEntity {
    return Object.assign(new UserEntity(), {
      id: uuidv4(),
      ...inputData,
    });
  }
}
