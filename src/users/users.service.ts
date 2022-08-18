import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/input';
import { RolesRepository } from '../roles/roles.repository';
import { GetUserArgs, GetUsersArgs } from './dto/args';
import { UsersRepository } from './users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserMapper } from './users.mapper';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}

  // TODO: add migrations
  async findById(userArgs: GetUserArgs): Promise<UserDto> {
    const user = await this.userRepository.findById(userArgs.id);
    return UserMapper.toDto(user);
  }

  async findUsers(usersArgs: GetUsersArgs): Promise<UserDto[]> {
    return await this.userRepository.findAll(usersArgs);
  }

  public async create(userData: CreateUserInput): Promise<UserDto> {
    const isExistUser = await this.userRepository.findByPhone(userData.phone);
    if (isExistUser) {
      throw new BadRequestException('User exist!');
    }

    const roles = await this.roleRepository.findByIds(userData.roleIds);
    // TODO: check exists role

    const user = await this.userRepository.createUser(userData);
    return UserMapper.toDto(user);
  }

  public async update(updateUserData: UpdateUserInput): Promise<UserDto> {
    const user = await this.userRepository.findById(updateUserData.id);
    if (!user) {
      throw new BadRequestException('User not exist!');
    }
    const roles = await this.roleRepository.findByIds(updateUserData.roleIds);
    // TODO: check exists role
    const toUpdate = Object.assign(user, updateUserData);
    const updatedUser = await this.userRepository.updateUser(toUpdate);
    return UserMapper.toDto(updatedUser);
  }

  public async delete(deleteUserData: DeleteUserInput): Promise<UserDto> {
    const user = await this.userRepository.deleteById(deleteUserData.id);
    return UserMapper.toDto(user);
  }
}
