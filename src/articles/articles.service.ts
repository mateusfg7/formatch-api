import { Injectable } from '@nestjs/common'

import { CreateArticleParams } from './models/create-article-params.model'
import { UpdateArticleDto } from './dto/update-article.dto'

import { ArticlesRepository } from '@/repositories/articles-repository'

@Injectable()
export class ArticlesService {
  constructor(private articleRepository: ArticlesRepository) {}

  async createNewArticle(createArticleParams: CreateArticleParams) {
    const {
      banner_url,
      content,
      sources: sourcesArray,
      title,
    } = createArticleParams

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replaceAll(/\p{M}/gu, '')
      .replaceAll(' ', '-')

    const sources = String(sourcesArray.map(source => source.trim()))

    const article = await this.articleRepository.create({
      title,
      banner_url,
      content,
      slug,
      sources,
    })

    return { ...article, sources: article.sources.split(',') }
  }

  findAll() {
    return `This action returns all articles`
  }

  findOne(id: number) {
    return `This action returns a #${id} article`
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`
  }

  remove(id: number) {
    return `This action removes a #${id} article`
  }
}
