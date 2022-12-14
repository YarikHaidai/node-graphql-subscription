import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';

@ArgsType()
export class GetUsersArgs {
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  ids?: string[];
}
