import { Module } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';

@Module({
  providers: [RolesResolver, RolesService, RolesRepository],
})
export class RolesModule {}
