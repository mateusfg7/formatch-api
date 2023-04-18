import { ApiPropertyOptions } from '@nestjs/swagger'

interface ArticleApiProperties {
  params: {
    [key: string]: ApiPropertyOptions
  }
}

export const articleApiProperties: ArticleApiProperties = {
  params: {
    id: {
      title: 'Article ID',
      description: 'The CUID of article on database',
      example: 'clggtd0uo000008mneap6b49r',
    },
    title: {
      title: 'Title',
      description: 'The title for article',
      example: 'As vantagens do reboco',
    },
    slug: {
      title: 'Slug',
      description: 'The unique slug to identify article',
      example: 'as-vantagens-do-reboco',
    },
    content: {
      title: 'Content',
      description: 'Markdown content of article',
      example: 'O **reboco** é bom pra cobrir parede...',
    },
    banner_url: {
      title: 'Banner URL',
      description: 'URL of the banner image that will be use on article',
      example:
        'https://loremflickr.com/cache/resized/65535_52603422325_d870bf1d5a_c_640_480_nofilter.jpg',
    },
    sources: {
      title: 'Sources',
      type: [String],
      description:
        'A list of sources that was used as reference to write article',
      example: [
        'https://www.portalsolar.com.br/como-funciona-o-painel-solar-fotovoltaico.html',
        'https://maiscontroleerp.com.br/steel-frame-construcao-civil/',
        'https://blog.qualitab.com.br/logistica-na-construcao-civil-o-que-e-preciso-saber-sobre-o-tema/',
      ],
    },
    createdAt: {
      title: 'Created At',
      description: 'The moment that the article was created',
      example: new Date(),
    },
    updatedAt: {
      title: 'Updated At',
      description: 'The moment of the last update',
      example: new Date(),
    },
  },
}
