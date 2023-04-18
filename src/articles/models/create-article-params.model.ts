import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUrl, IsString } from 'class-validator'
import { articleApiProperties } from '../articles.openapi'

export class CreateArticleParams {
  @ApiProperty(articleApiProperties.params.title)
  @IsNotEmpty({
    message: 'Title could not be empty',
  })
  @IsString({
    message: 'Title need to be a string',
  })
  title: string

  @ApiProperty(articleApiProperties.params.content)
  @IsNotEmpty({
    message: 'Content could not be empty',
  })
  content: string

  @ApiProperty(articleApiProperties.params.banner_url)
  @IsNotEmpty({
    message: 'Banner URL could not be empty',
  })
  @IsUrl(
    {},
    {
      message: 'Banner URL need to be a valid URL',
    },
  )
  banner_url: string

  @ApiProperty(articleApiProperties.params.sources)
  @IsNotEmpty({
    message: 'Sources could not be empty',
  })
  @IsUrl(
    {},
    {
      each: true,
      message: 'Sources need to be a valid URL',
    },
  )
  sources: string[]
}
