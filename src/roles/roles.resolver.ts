import { Query, Resolver } from '@nestjs/graphql';
import { Role } from './models/Role';
import { RolesService } from './roles.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly roleService: RolesService) {}

  @Query(() => [Role], { name: 'roles', nullable: 'items' })
  getRoles(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}
