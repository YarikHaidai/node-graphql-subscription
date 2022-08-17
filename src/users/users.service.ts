import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { In, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CreateUserInput } from "./dto/input/create-user.input";
import { User } from "./models/User";
import { GetUserArgs } from "./dto/args/get-user.args";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { RoleEntity } from "../roles/role.entity";
import { UserMapper } from "./users.mapper";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>
  ) {}

  // TODO: add mapper
  // TODO: add custom repository
  // TODO: сделать норм нейминг
  // TODO: add migrations
  // TODO: add eslinter
  async findById(userArgs: GetUserArgs): Promise<User> {
    // TODO: Deprecated
    const user = await this.userRepository.findOne({
      where: {id: userArgs.id}}
    );

    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }

  async findByIds(usersArgs: GetUsersArgs): Promise<User[]> {
    // TODO: Deprecated
    return await this.userRepository.createQueryBuilder({
      where: { id: In(usersArgs.ids) }
    });
  }

  public async create(storeUserData: CreateUserInput): Promise<User> {
    const user = UserMapper.toCreateEntity(storeUserData);

    user.roles = await this.roleRepository.find({
      where: { id: In(storeUserData.roles) }
    });

    console.log(storeUserData.roles);
    console.log(user);

    return await this.userRepository.save(user);
  }

  public async update(updateUserData: UpdateUserInput): Promise<User> {
    return await this.userRepository.save(updateUserData);
  }

  // TODO: change returned value
  public async delete(deleteUserData: DeleteUserInput): Promise<User> {
    const user = this.findById(deleteUserData);
    await this.userRepository.delete(deleteUserData);

    return user;
  }
}