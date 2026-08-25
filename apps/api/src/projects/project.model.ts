import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  summary!: string;

  @Field()
  contribution!: string;

  @Field(() => [String])
  technologies!: string[];

  @Field(() => Int)
  sortOrder!: number;
}
