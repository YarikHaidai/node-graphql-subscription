import { Field, ObjectType } from "@nestjs/graphql";

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

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}