import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RolesRepository } from '../roles/roles.repository';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository, RolesRepository],
})
export class UsersModule {}
