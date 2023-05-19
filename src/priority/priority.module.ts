import { Module } from '@nestjs/common';
import { PrioritiesResolver } from './priority.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrioritiesResolver, PrismaService],
})
export class PrioritiesModule {}
