import { IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUrl()
  banner_url: string;

  @IsNotEmpty()
  @IsUrl(
    {},
    {
      each: true,
    },
  )
  sources: string[];
}
