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
import { Todo } from './models/todo.model';
import { Priority } from 'src/priority/models/priority.model';

// Resolver（リゾルバ）：GraphQLがアクセスするための窓口
@Resolver(() => Todo)
export class TodosResolver {
  // コンストラクタ
  constructor(private prisma: PrismaService) {}

  @Query(() => [Todo])
  async todos() {
    // 全TODO情報を返す
    return this.prisma.todo.findMany();
  }

  // nullable: true をつけることでキーに一致するTODO情報がない場合はnullを返すようにすることができる
  @Query(() => Todo, { nullable: true })
  // idの引数定義をこのようにすることでschema.gplの型がfloatでなくなる
  async todo(@Args('id', { type: () => Int }) id: number) {
    // id（主キー）を指定しただ一つのTODO情報を返す
    // nullable: trueがない場合、主キーが一致したデータがないとエラーになる
    return this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('name') name: string,
    @Args('deadline') deadline: Date,
    @Args('detail') detail: string,
    @Args('priority_id', { type: () => Int }) priority_id: number,
    @Args('done') done: boolean,
  ) {
    // 引数のTODOデータを一行作成する
    // idは自動付番の想定
    return this.prisma.todo.create({
      data: {
        name,
        deadline,
        detail,
        priority_id,
        done,
      },
    });
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number, // このようにすることでschema.gplの型がfloatでなくなる
    @Args('name') name: string,
    @Args('deadline') deadline: Date,
    @Args('detail') detail: string,
    @Args('priority_id', { type: () => Int }) priority_id: number,
    @Args('done') done: boolean,
  ) {
    // id（主キー）を指定しただ一つのTODO情報を
    // 引数のTODO情報に更新する
    return this.prisma.todo.update({
      data: {
        name,
        deadline,
        detail,
        priority_id,
        done,
      },
      where: { id },
    });
  }

  @ResolveField(() => Priority)
  async priority(@Root() todo: Todo) {
    return this.prisma.priority.findUnique({
      where: {
        id: todo.priority_id,
      },
    });
  }
}
