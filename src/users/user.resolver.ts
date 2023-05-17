import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users() {
    return this.prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(@Args('email') email: string, @Args('name') name: string) {
    return this.prisma.user.create({ data: { email, name } });
  }
}
