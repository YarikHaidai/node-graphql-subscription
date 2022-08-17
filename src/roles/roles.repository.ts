import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
