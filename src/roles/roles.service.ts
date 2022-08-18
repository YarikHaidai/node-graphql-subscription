import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(private roleRepository: RolesRepository) {}

  async findAll(): Promise<RoleDto[]> {
    return await this.roleRepository.findAll();
  }
}
