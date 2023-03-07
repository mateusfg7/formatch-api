import { Injectable } from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { PrismaService } from '@/database/prisma.service';
import { ArticlesRepository } from '@/repositories/articles-repository';

@Injectable()
export class ArticlesService {
  constructor(private articleRepository: ArticlesRepository) {}

  async create(createArticleDto: CreateArticleDto) {
    const {
      banner_url,
      content,
      sources: sourcesArray,
      title,
    } = createArticleDto;

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replaceAll(/\p{M}/gu, '')
      .replaceAll(' ', '-');

    const sources = String(sourcesArray);

    const article = await this.articleRepository.create(
      title,
      slug,
      content,
      banner_url,
      sources,
    );

    return article;
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
