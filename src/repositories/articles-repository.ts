import { Article } from '@prisma/client';

interface Props {
  title: string;
  slug: string;
  banner_url: string;
  sources: string;
  content: string;
}

export abstract class ArticlesRepository {
  abstract create(props: Props): Promise<Article>;
}
