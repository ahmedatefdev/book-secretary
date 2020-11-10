import {
  IsString,
  MinLength,
  MaxLength,
  IsDefined,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { BOOK_TYPE } from '../book.model';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  publication_date: string;

  @IsDefined()
  @IsIn([BOOK_TYPE.PRIVET, BOOK_TYPE.PUBLIC])
  type: BOOK_TYPE;
}
