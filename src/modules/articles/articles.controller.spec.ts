import { Test, TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'

import { PrismaService } from '@/database/prisma.service'
import { ArticlesRepository } from '@/repositories/articles-repository'

import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'

const repository = {
  create: jest
    .fn()
    .mockImplementation(
      ({
        banner_url,
        content,
        slug,
        sources,
        title,
      }: {
        title: string
        slug: string
        banner_url: string
        sources: string
        content: string
      }) => {
        return {
          id: faker.datatype.uuid(),
          slug,
          title,
          banner_url,
          sources,
          content,
          createdAt: faker.date.recent(0),
          updatedAt: faker.date.recent(0),
        }
      },
    ),
}

describe('ArticlesController', () => {
  let controller: ArticlesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        PrismaService,
        {
          provide: ArticlesRepository,
          useValue: repository,
        },
      ],
    }).compile()

    controller = module.get<ArticlesController>(ArticlesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
