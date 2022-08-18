import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../roles/models/Role';
import { IsArray } from 'class-validator';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => [Role], { nullable: true })
  @IsArray()
  roles: Role[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
