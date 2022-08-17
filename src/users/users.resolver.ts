import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { User } from "./models/User";
import { UsersService } from "./users.service";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true})
  getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.userService.findById(getUserArgs);
  }

  @Query(() => [User], {name: 'users', nullable: 'items'})
  getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return this.userService.findByIds(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    return this.userService.create(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
    return this.userService.update(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): Promise<User> {
    return this.userService.delete(deleteUserData);
  }
}