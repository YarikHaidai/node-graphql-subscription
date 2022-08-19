import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleDto } from './dto/role.dto';
import { RoleMapper } from './roles.mapper';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
  public async findByIds(ids: string[] = []): Promise<RoleDto[]> {
    const roles = await this.manager.find(RoleEntity, {
      where: {
        id: In(ids),
      },
    });
    return roles.map((role) => RoleMapper.toDto(role));
  }

  public async findAll(): Promise<RoleDto[]> {
    const roles = await this.manager.find(RoleEntity);
    return roles.map((role) => RoleMapper.toDto(role));
  }
}
