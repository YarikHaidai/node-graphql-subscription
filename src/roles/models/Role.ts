import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Role {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
