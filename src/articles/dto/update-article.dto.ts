import { PartialType } from '@nestjs/mapped-types'
import { CreateArticleParams } from '../models/create-article-params.model'

export class UpdateArticleDto extends PartialType(CreateArticleParams) {}
