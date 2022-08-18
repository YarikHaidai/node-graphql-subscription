import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  roleIds?: string[];
}
