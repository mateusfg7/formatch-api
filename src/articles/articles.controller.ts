import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { ArticlesService } from './articles.service'
import { UpdateArticleDto } from './dto/update-article.dto'

import { CreateArticleParams } from './models/create-article-params.model'
import { ArticleResponse } from './models/article-response.model'

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an article' })
  @ApiCreatedResponse({ type: ArticleResponse })
  create(@Body() createArticleParams: CreateArticleParams) {
    return this.articlesService.createNewArticle(createArticleParams)
  }

  @Get()
  findAll() {
    return this.articlesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id)
  }
}
