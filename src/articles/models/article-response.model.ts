import { ApiProperty } from '@nestjs/swagger'
import { articleApiProperties } from '../articles.openapi'

export class ArticleResponse {
  @ApiProperty(articleApiProperties.params.id)
  id: string

  @ApiProperty(articleApiProperties.params.title)
  title: string

  @ApiProperty(articleApiProperties.params.slug)
  slug: string

  @ApiProperty(articleApiProperties.params.content)
  content: string

  @ApiProperty(articleApiProperties.params.banner_url)
  banner_url: string

  @ApiProperty(articleApiProperties.params.sources)
  sources: string[]

  @ApiProperty(articleApiProperties.params.createdAt)
  createdAt: Date

  @ApiProperty(articleApiProperties.params.updatedAt)
  updatedAt: Date
}
