import {
  IsString,
  MinLength,
  MaxLength,
  IsIn,
  IsOptional,
} from 'class-validator';
import { BOOK_TYPE } from '../book.model';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  publication_date: string;

  @IsOptional()
  @IsIn([BOOK_TYPE.PRIVET, BOOK_TYPE.PUBLIC])
  type: BOOK_TYPE;
}
