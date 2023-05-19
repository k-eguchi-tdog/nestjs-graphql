import { Module } from '@nestjs/common';
import { TodosResolver } from './todo.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TodosResolver, PrismaService],
})
export class TodosModule {}
