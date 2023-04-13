import { Article } from '@prisma/client'

export abstract class ArticlesRepository {
  abstract create(props: {
    title: string
    slug: string
    banner_url: string
    sources: string
    content: string
  }): Promise<Article>
  abstract findAll(): Promise<Article[]>
  abstract findOne(slug: string): Promise<Article>
  abstract update(props: {
    slug: string
    title?: string
    banner_url?: string
    sources?: string
    content?: string
  }): Promise<Article>
  abstract remove(slug: string): Promise<void>
}
