import { DataSource, In, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { GetUsersArgs } from './dto/args';
import { UserMapper } from './users.mapper';
import { CreateUserInput, UpdateUserInput } from './dto/input';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async createUser(userData: CreateUserInput): Promise<UserDto | null> {
    const entity = UserMapper.toCreateEntity(userData);
    const user = await this.manager.save(UserEntity, entity);
    return this.findById(user.id);
  }

  public async updateUser(userData: UpdateUserInput): Promise<UserDto | null> {
    const entity = UserMapper.toUpdateEntity(userData);
    await this.manager.save(entity);
    return this.findById(userData.id);
  }

  public async findById(id: string): Promise<UserDto | null> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id },
      relations: ['roles'],
    });
    return user ? UserMapper.toDto(user) : null;
  }

  public async findByPhone(phone: string): Promise<UserDto | null> {
    const user = await this.manager.findOne(UserEntity, {
      where: { phone },
    });
    return user ? UserMapper.toDto(user) : null;
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

  public async deleteById(id: string): Promise<UserDto | null> {
    const user = this.findById(id);
    await this.manager.delete(UserEntity, {
      where: { id },
    });
    return user ? user : null;
  }
}
