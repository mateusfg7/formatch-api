import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUrl, IsString } from 'class-validator'

export class CreateArticleParams {
  @ApiProperty({
    title: 'Title',
    description: 'The title for article',
    example: 'As vantagens do reboco',
  })
  @IsNotEmpty({
    message: 'Title could not be empty',
  })
  @IsString({
    message: 'Title need to be a string',
  })
  title: string

  @ApiProperty({
    title: 'Content',
    description: 'Markdown content of article',
    example: 'O **reboco** é bom pra cobrir parede...',
  })
  @IsNotEmpty({
    message: 'Content could not be empty',
  })
  content: string

  @ApiProperty({
    title: 'Banner URL',
    description: 'URL of the banner image that will be use on article',
    example:
      'https://loremflickr.com/cache/resized/65535_52603422325_d870bf1d5a_c_640_480_nofilter.jpg',
  })
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

  @ApiProperty({
    title: 'Sources',
    type: [String],
    description:
      'A list of sources that was used as reference to write article',
    example: [
      'https://www.portalsolar.com.br/como-funciona-o-painel-solar-fotovoltaico.html',
      'https://maiscontroleerp.com.br/steel-frame-construcao-civil/',
      'https://blog.qualitab.com.br/logistica-na-construcao-civil-o-que-e-preciso-saber-sobre-o-tema/',
    ],
  })
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
