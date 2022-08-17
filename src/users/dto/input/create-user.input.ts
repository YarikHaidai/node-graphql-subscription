import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsEmail, IsNotEmpty } from "class-validator";
import { RoleEntity } from "../../../roles/role.entity";

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field(() => [String])
  @IsArray()
  roles?: RoleEntity[];
}