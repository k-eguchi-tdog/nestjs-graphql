import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from './models/user.model';

// Resolver（リゾルバ）：GraphQLがアクセスするための窓口
@Resolver(() => User)
export class UsersResolver {
  // コンストラクタ
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users() {
    // 全ユーザー情報を返す
    return this.prisma.user.findMany();
  }

  @Query(() => User)
  // idの引数定義をこのようにすることでschema.gplの型がfloatでなくなる
  async user(@Args('id', { type: () => Int }) id: number) {
    // id（主キー）を指定しただ一つのユーザー情報を返す
    // 主キーが一致したデータがないとエラーになる
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => User)
  async createUser(@Args('email') email: string, @Args('name') name: string) {
    // 引数のユーザーデータを一行作成する
    // idは自動付番の想定
    return this.prisma.user.create({ data: { email, name } });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number, // このようにすることでschema.gplの型がfloatでなくなる
    @Args('email') email: string,
    @Args('name') name: string,
  ) {
    // id（主キー）を指定しただ一つのユーザー情報を
    // 引数のユーザー情報に更新する
    return this.prisma.user.update({
      data: { email, name },
      where: { id },
    });
  }
}
