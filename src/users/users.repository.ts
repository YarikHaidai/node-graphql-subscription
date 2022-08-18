import { DataSource, In, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUsersArgs } from './dto/args';
import { UserMapper } from './users.mapper';
import { CreateUserInput, UpdateUserInput } from './dto/input';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async makeUser(userData: CreateUserInput): Promise<UserEntity> {
    const user = await this.manager.findOne(UserEntity, {
      where: { phone: userData.phone },
    });
    if (user instanceof UserEntity) {
      throw new BadRequestException('User exist!');
    }
    const entity = UserMapper.toCreateEntity(userData);
    return await this.manager.save(UserEntity, entity);
  }

  public async updateUser(userData: UpdateUserInput): Promise<UserEntity> {
    delete userData.roleIds;
    return await this.manager.save(UserEntity, userData);
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  public async findAll(filter: GetUsersArgs): Promise<UserDto[]> {
    let queryFilter = {};
    if (filter.ids.length) {
      queryFilter = {
        where: {
          id: In(filter.ids),
        },
      };
    }
    const users = await this.manager.find(UserEntity, {
      relations: ['roles'],
      ...queryFilter,
    });

    return users.map((user: UserEntity) => UserMapper.toDto(user));
  }

  public async deleteById(id: string): Promise<UserEntity> {
    const user = this.findById(id);
    await this.manager.delete(UserEntity, {
      where: { id },
    });
    return user;
  }
}
