import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

// モデルにはObjectTypeデコレータをつける
@ObjectType()
export class Todo {
  @Field(() => ID)
  id: number; // ID: 連番
  name: string; // 名前：文字列
  deadline: Date; // 期日：日付
  detail: string; // 詳細：文字列
  @Field(() => Int)
  priority_id: number; // 優先度：数値
  done: boolean; // 完了フラグ
}
