import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserEntity } from '../users/user.entity';
import { RoleEntity } from '../roles/role.entity';
import { CreateRoleUserTables1660855108403 } from '../../db/migrations/1660855108403-CreateRoleUserTables';

dotenv.config({ path: '.env' });

@Injectable()
export class ConfigService {
  static getOrmConfig() {
    const {
      DATABASE_TYPE,
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      DATABASE_NAME,
      DATABASE_ENTITIES,
      DATABASE_SYNCHRONIZE,
    } = process.env;

    return {
      type: DATABASE_TYPE || 'mysql',
      host: DATABASE_HOST || 'localhost',
      port: DATABASE_PORT || '3306',
      username: DATABASE_USER || 'root',
      password: DATABASE_PASSWORD || 'password',
      database: DATABASE_NAME || 'graphql-test',
      entities: [DATABASE_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
      synchronize: DATABASE_SYNCHRONIZE || true,
    };
  }

  static getMigrationOrmConfig() {
    const {
      DATABASE_TYPE,
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      DATABASE_NAME,
    } = process.env;

    return {
      type: DATABASE_TYPE || 'mysql',
      host: DATABASE_HOST || 'localhost',
      port: DATABASE_PORT || '3306',
      username: DATABASE_USER || 'root',
      password: DATABASE_PASSWORD || 'password',
      database: DATABASE_NAME || 'graphql-test',
      entities: [UserEntity, RoleEntity],
      migrations: [CreateRoleUserTables1660855108403],
    };
  }
}
