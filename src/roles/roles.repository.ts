import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
  public async findByIds(ids: string[] = []): Promise<RoleEntity[]> {
    return await this.manager.find(RoleEntity, {
      where: {
        id: In(ids),
      },
    });
  }

  public async findAll(): Promise<RoleEntity[]> {
    return await this.manager.find(RoleEntity);
  }
}
