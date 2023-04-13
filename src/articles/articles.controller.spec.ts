import { Test, TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'

import { PrismaService } from '@/database/prisma.service'
import { ArticlesRepository } from '@/repositories/articles-repository'

import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'

describe('Articles Controller', () => {
  let articlesController: ArticlesController
  let articlesService: ArticlesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        PrismaService,
        {
          provide: ArticlesRepository,
          useValue: {
            create: jest.fn().mockImplementation(() => 0),
          },
        },
      ],
    }).compile()

    articlesController = module.get<ArticlesController>(ArticlesController)
    articlesService = module.get<ArticlesService>(ArticlesService)
  })

  it('should be defined', () => {
    expect(articlesController).toBeDefined()
    expect(articlesService).toBeDefined()
  })

  describe('create', () => {
    it('should return an article', async () => {
      const articlePayload = {
        title: 'As vantagens do Reboco',
        slug: 'as-vantagens-do-reboco',
        banner_url: faker.image.abstract(),
        content: faker.lorem.text(),
        sources: [
          faker.internet.url(),
          faker.internet.url(),
          ` ${faker.internet.url()}`,
        ],
      }
      const createdArticle = {
        ...articlePayload,
        id: faker.datatype.uuid(),
        sources: String(articlePayload.sources),
        createdAt: faker.date.recent(0),
        updatedAt: faker.date.recent(0),
      }

      jest.spyOn(articlesService, 'create').mockResolvedValue(createdArticle)

      const result = await articlesController.create(articlePayload)

      expect(result).toEqual(createdArticle)
      expect(articlesService.create).toHaveBeenCalledWith(articlePayload)
    })
  })
})
