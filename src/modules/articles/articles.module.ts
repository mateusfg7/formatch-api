import { Module } from '@nestjs/common';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

import { PrismaService } from '@/database/prisma.service';

import { ArticlesRepository } from '@/repositories/articles-repository';
import { PrismaArticlesRepositoryService } from '@/repositories/prisma/prisma-articles-repository.service';

@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    PrismaService,
    {
      provide: ArticlesRepository,
      useClass: PrismaArticlesRepositoryService,
    },
  ],
})
export class ArticlesModule {}
