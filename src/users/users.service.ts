import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/input';
import { RoleEntity } from '../roles/role.entity';
import { UserMapper } from './users.mapper';
import { GetUserArgs, GetUsersArgs } from './dto/args';
import { UsersRepository } from './users.repository';
import { RolesRepository } from "../roles/roles.repository";

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}

  // TODO: add mapper
  // TODO: add custom repository
  // TODO: сделать норм нейминг
  // TODO: add migrations
  async findById(userArgs: GetUserArgs): Promise<UserDto> {
    // TODO: Deprecated
    return await this.userRepository.findById(userArgs.id);
  }

  async findUsers(usersArgs: GetUsersArgs): Promise<UserDto[]> {
    return await this.userRepository.findAll(usersArgs);
  }

  public async create(storeUserData: CreateUserInput): Promise<UserDto> {
    const entity = UserMapper.toCreateEntity(storeUserData);

    entity.roles = await this.roleRepository.find({
      where: {
        id: In(storeUserData.roles),
      },
    });

    const user = await this.userRepository.save(entity);
    return UserMapper.toDto(user);
  }

  public async update(updateUserData: UpdateUserInput): Promise<UserDto> {
    const user = await this.userRepository.save(updateUserData);
    return UserMapper.toDto(user);
  }

  // TODO: change returned value
  public async delete(deleteUserData: DeleteUserInput): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: deleteUserData.id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete(deleteUserData);

    return UserMapper.toDto(user);
  }
}
