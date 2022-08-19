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
    await this._checkExistRoles(userData.roleIds);

    return await this.userRepository.createUser(userData);
  }

  public async update(updateUserData: UpdateUserInput): Promise<UserDto> {
    const user = await this.userRepository.findById(updateUserData.id);
    if (!user) {
      throw new BadRequestException('User not exist!');
    }
    await this._checkExistRoles(updateUserData.roleIds);
    const toUpdate = Object.assign(user, updateUserData);
    return await this.userRepository.updateUser(toUpdate);
  }

  public async delete(deleteUserData: DeleteUserInput): Promise<UserDto> {
    return await this.userRepository.deleteById(deleteUserData.id);
  }

  private async _checkExistRoles(inputRoleIds: string[]): Promise<void> {
    const roles = await this.roleRepository.findByIds(inputRoleIds);
    const roleIds = roles.map((role) => role.id);
    const notExistRoles = inputRoleIds.filter((id) => !roleIds.includes(id));
    if (notExistRoles.length) {
      throw new BadRequestException(
        `Roles with ids do not exist: ${notExistRoles.join()}`,
      );
    }
  }
}
