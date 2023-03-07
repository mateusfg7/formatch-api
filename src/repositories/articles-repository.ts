import { Article } from '@prisma/client';

export abstract class ArticlesRepository {
  abstract create(
    title: string,
    slug: string,
    banner_url: string,
    sources: string,
    content: string,
  ): Promise<Article>;
}
