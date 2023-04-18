import { Test, TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { createId as createCUID } from '@paralleldrive/cuid2'
import { Article } from '@prisma/client'

import { ArticlesService } from './articles.service'
import { PrismaService } from '@/common/services/prisma.service'

describe('Articles Service', () => {
  let articlesService: ArticlesService
  let spyPrismaService: DeepMockProxy<PrismaService>

  const expectedArticleData = {
    id: createCUID(),
    title: 'Logística na Construção Civil',
    slug: 'logistica-na-construcao-civil',
    banner_url: faker.image.abstract(),
    content: faker.lorem.paragraphs(5),
    sourcesArray: [
      faker.internet.url(),
      faker.internet.url(),
      ` ${faker.internet.url()}`,
    ],
    createdAt: faker.date.recent(0),
    updatedAt: faker.date.recent(0),
  }
  const expectedSourcesString = String(
    expectedArticleData.sourcesArray.map(source => source.trim()),
  )
  const article: Article = {
    id: expectedArticleData.id,
    slug: expectedArticleData.slug,
    title: expectedArticleData.title,
    banner_url: expectedArticleData.banner_url,
    sources: expectedSourcesString,
    content: expectedArticleData.content,
    createdAt: expectedArticleData.createdAt,
    updatedAt: expectedArticleData.updatedAt,
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile()

    articlesService = moduleRef.get<ArticlesService>(ArticlesService)
    spyPrismaService = moduleRef.get(
      PrismaService,
    ) as DeepMockProxy<PrismaService>
  })

  it('should be defined', () => {
    expect(articlesService).toBeDefined()
  })

  describe('Create new article', () => {
    const articlePayload = {
      title: expectedArticleData.title,
      banner_url: expectedArticleData.banner_url,
      content: expectedArticleData.content,
      sources: expectedArticleData.sourcesArray,
    }

    it('should create an article with valid data', async () => {
      spyPrismaService.article.create.mockResolvedValue(article)

      const createdArticle = await articlesService.createNewArticle(
        articlePayload,
      )

      expect(spyPrismaService.article.create).toBeCalledTimes(1)
      expect(spyPrismaService.article.create).toHaveBeenCalledWith({
        data: {
          ...articlePayload,
          sources: expectedSourcesString,
          slug: expectedArticleData.slug,
        },
      })
      expect(createdArticle).toEqual({
        ...article,
        sources: article.sources.split(','),
      })
    })
  })

  describe('Get articles', () => {
    it('should return a list of articles', async () => {
      spyPrismaService.article.findMany.mockResolvedValue([
        article,
        {
          ...article,
          id: createCUID(),
          title: 'Como funciona o biogás',
          slug: 'como-funciona-o-biogas',
        },
      ])

      const articleList = await articlesService.getAllArticles()

      expect(spyPrismaService.article.findMany).toBeCalledTimes(1)
      expect(articleList.length).toBeGreaterThan(0)
      articleList.forEach(article => {
        expect(Array.isArray(article.sources)).toBe(true)
      })
    })
  })
})
