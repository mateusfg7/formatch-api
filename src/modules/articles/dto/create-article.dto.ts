import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: 'Title could not be empty',
  })
  title: string;

  @IsNotEmpty({
    message: 'Content could not be empty',
  })
  content: string;

  @IsNotEmpty({
    message: 'Banner URL could not be empty',
  })
  @IsUrl(
    {},
    {
      message: 'Banner URL need to be a valid URL',
    },
  )
  banner_url: string;

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
  sources: string[];
}
