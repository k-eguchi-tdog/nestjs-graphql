import { Field, ID, ObjectType } from '@nestjs/graphql';

// モデルにはObjectTypeデコレータをつける
@ObjectType()
export class Priority {
  @Field(() => ID)
  id: number; // ID: 連番
  name: string; // 名前：文字列
}
