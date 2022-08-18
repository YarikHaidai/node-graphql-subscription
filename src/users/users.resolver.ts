import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/input';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { GetUserArgs, GetUsersArgs } from './dto/args';
import { UsersService } from './users.service';
import { User } from './models/User';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.userService.findById(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  listUser(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return this.userService.findUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserData);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.userService.delete(deleteUserData);
  }
}
