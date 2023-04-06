import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import validator from 'validator';

import { ArticlesService } from './articles.service';

import { PrismaService } from '@/database/prisma.service';
import { ArticlesRepository } from '@/repositories/articles-repository';

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
        title: string;
        slug: string;
        banner_url: string;
        sources: string;
        content: string;
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
        };
      },
    ),
};

describe('Articles Service', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        PrismaService,
        {
          provide: ArticlesRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an article', async () => {
    const createdArticle = await service.create({
      title: 'As vantagens do Reboco',
      banner_url: faker.image.abstract(),
      content: faker.lorem.text(),
      sources: [
        faker.internet.url(),
        faker.internet.url(),
        ` ${faker.internet.url()}`,
      ],
    });

    expect(validator.isUUID(createdArticle.id)).toEqual(true);
    expect(validator.isURL(createdArticle.banner_url)).toEqual(true);
    expect(createdArticle.slug).toBe('as-vantagens-do-reboco');
    expect(createdArticle.createdAt).toBeInstanceOf(Date);
    expect(createdArticle.updatedAt).toBeInstanceOf(Date);
    createdArticle.sources.split(',').forEach((source) => {
      expect(validator.isURL(source)).toEqual(true);
    });
  });
});
