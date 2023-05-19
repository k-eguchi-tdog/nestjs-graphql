import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Priority } from './models/priority.model';
import { Todo } from 'src/todo/models/todo.model';

// Resolver（リゾルバ）：GraphQLがアクセスするための窓口
@Resolver(() => Priority)
export class PrioritiesResolver {
  // コンストラクタ
  constructor(private prisma: PrismaService) {}

  @Query(() => [Priority])
  async priorities() {
    // 全優先度情報を返す
    return this.prisma.priority.findMany();
  }

  // nullable: true をつけることでキーに一致する優先度情報がない場合はnullを返すようにすることができる
  @Query(() => Priority, { nullable: true })
  // idの引数定義をこのようにすることでschema.gplの型がfloatでなくなる
  async priority(@Args('id', { type: () => Int }) id: number) {
    // id（主キー）を指定しただ一つの優先度情報を返す
    // nullable: trueがない場合、主キーが一致したデータがないとエラーになる
    return this.prisma.priority.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => Priority)
  async createPriority(@Args('name') name: string) {
    // 引数の優先度データを一行作成する
    // idは自動付番の想定
    return this.prisma.priority.create({
      data: {
        name,
      },
    });
  }

  @Mutation(() => Priority)
  async updatePriority(
    @Args('id', { type: () => Int }) id: number, // このようにすることでschema.gplの型がfloatでなくなる
    @Args('name') name: string,
  ) {
    // id（主キー）を指定しただ一つの優先度情報を
    // 引数の優先度情報に更新する
    return this.prisma.priority.update({
      data: { name },
      where: { id },
    });
  }

  @ResolveField(() => [Todo])
  async todos(@Root() priority_id: number) {
    return this.prisma.todo.findMany({
      where: { id: priority_id },
    });
  }
}
