import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { ArticlesRepository } from '../articles-repository';

@Injectable()
export class PrismaArticlesRepositoryService implements ArticlesRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    title: string,
    slug: string,
    banner_url: string,
    sources: string,
    content: string,
  ): Promise<Article> {
    const article = await this.prisma.article.create({
      data: {
        banner_url,
        content,
        slug,
        sources,
        title,
      },
    });

    return article;
  }
}
