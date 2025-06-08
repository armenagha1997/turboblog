import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Post} from "../../post/entities/post.entity";
import {User} from "../../user/entities/user.entity";

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => [Post])
  posts: Post[];

  @Field()
  createdAt: Date;
}
