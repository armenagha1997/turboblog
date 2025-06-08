import {Resolver, Query, Context, Args, Int} from '@nestjs/graphql';
import {PostService} from './post.service';
import {Post} from './entities/post.entity';
// import {UseGuards} from "@nestjs/common";
// import {JwtAuthGuard} from "../auth/guards/jwt-auth/jwt-auth.guard";

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) {
    }

    // @UseGuards(JwtAuthGuard)
    @Query(() => [Post], {name: 'posts'})
    findAll(@Context() context,
            @Args('skip', {nullable: true}) skip?: number,
            @Args('take', {nullable: true}) take?: number,
    ) {
        const user = context.req.user;
        console.log({ user });
        return this.postService.findAll({skip, take});
    }

    @Query(() => Int, {name: 'postCount'})
    count() {
        return this.postService.count();
    }
}
