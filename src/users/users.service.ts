import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/input';
import { RolesRepository } from '../roles/roles.repository';
import { GetUserArgs, GetUsersArgs } from './dto/args';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}

  // TODO: сделать норм нейминг
  // TODO: add migrations
  async findById(userArgs: GetUserArgs): Promise<UserDto> {
    const user = await this.userRepository.findById(userArgs.id);
    return UserMapper.toDto(user);
  }

  async findUsers(usersArgs: GetUsersArgs): Promise<UserDto[]> {
    return await this.userRepository.findAll(usersArgs);
  }

  public async create(userData: CreateUserInput): Promise<UserDto> {
    const roleIds: string[] = userData.roles.map((role) => role.id);
    userData.roles = await this.roleRepository.findByIds(roleIds);
    const user = await this.userRepository.makeUser(userData);
    return UserMapper.toDto(user);
  }

  public async update(updateUserData: UpdateUserInput): Promise<UserDto> {
    const user = await this.userRepository.save(updateUserData);
    return UserMapper.toDto(user);
  }

  public async delete(deleteUserData: DeleteUserInput): Promise<UserDto> {
    const user = await this.userRepository.deleteById(deleteUserData.id);
    return UserMapper.toDto(user);
  }
}
