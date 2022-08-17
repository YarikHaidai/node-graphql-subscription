import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUsersArgs } from './dto/args';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async findById(id: string): Promise<UserDto> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    return UserMapper.toDto(user);
  }

  public async findAll(filter: GetUsersArgs): Promise<UserDto[]> {
    const queryUsers = this.manager.createQueryBuilder();
    if (filter.ids.length) {
      queryUsers.whereInIds(filter.ids);
    }
    return queryUsers.execute();
  }
}
