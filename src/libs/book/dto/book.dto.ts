import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  authors: string;

  @IsOptional()
  @IsBoolean()
  favorite: boolean;

  @IsOptional()
  @IsString()
  fileCover: string;

  @IsOptional()
  @IsString()
  fileBook: string;
}
