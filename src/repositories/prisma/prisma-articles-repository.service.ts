import { Injectable } from '@nestjs/common'
import { Article } from '@prisma/client'

import { PrismaService } from '@/database/prisma.service'

import { ArticlesRepository } from '../articles-repository'

@Injectable()
export class PrismaArticlesRepositoryService implements ArticlesRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    title,
    slug,
    banner_url,
    sources,
    content,
  }): Promise<Article> {
    const article = await this.prisma.article.create({
      data: {
        banner_url,
        content,
        slug,
        sources,
        title,
      },
    })

    return article
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany()

    return articles
  }

  async findOne(slug: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    })

    return article
  }

  async update({
    slug,
    title,
    banner_url,
    sources,
    content,
  }): Promise<Article> {
    const updatedArticle = await this.prisma.article.update({
      where: {
        slug,
      },
      data: {
        title,
        banner_url,
        sources,
        content,
      },
    })

    return updatedArticle
  }

  async remove(slug: string): Promise<void> {
    await this.prisma.article.delete({
      where: {
        slug,
      },
    })
  }
}
