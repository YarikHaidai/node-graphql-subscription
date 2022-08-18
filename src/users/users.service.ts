import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/input';
import { RolesRepository } from '../roles/roles.repository';
import { GetUserArgs, GetUsersArgs } from './dto/args';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from './users.mapper';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}

  // TODO: add migrations
  // TODO: add query for list roles
  async findById(userArgs: GetUserArgs): Promise<UserDto> {
    const user = await this.userRepository.findById(userArgs.id);
    return UserMapper.toDto(user);
  }

  async findUsers(usersArgs: GetUsersArgs): Promise<UserDto[]> {
    return await this.userRepository.findAll(usersArgs);
  }

  public async create(userData: CreateUserInput): Promise<UserDto> {
    const roles = await this.roleRepository.findByIds(userData.roleIds);
    const object = {
      ...userData,
      roles,
    };
    const user = await this.userRepository.makeUser(object);
    return UserMapper.toDto(user);
  }

  public async update(updateUserData: UpdateUserInput): Promise<UserDto> {
    const roles = await this.roleRepository.findByIds(updateUserData.roleIds);
    const object = {
      ...updateUserData,
      roles,
    };
    const user = await this.userRepository.updateUser(object);
    return UserMapper.toDto(user);
  }

  public async delete(deleteUserData: DeleteUserInput): Promise<UserDto> {
    const user = await this.userRepository.deleteById(deleteUserData.id);
    return UserMapper.toDto(user);
  }
}
