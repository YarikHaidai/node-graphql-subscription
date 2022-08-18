import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUsersArgs } from './dto/args';
import { UserMapper } from './users.mapper';
import { CreateUserInput } from './dto/input';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async makeUser(userData: CreateUserInput): Promise<UserEntity> {
    const entity = UserMapper.toCreateEntity(userData);
    return await this.manager.save(UserEntity, entity);
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  public async findAll(filter: GetUsersArgs): Promise<UserDto[]> {
    const queryUsers = this.manager.createQueryBuilder();
    if (filter.ids.length) {
      queryUsers.whereInIds(filter.ids);
    }
    const users: UserEntity[] = await queryUsers.getMany();
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
