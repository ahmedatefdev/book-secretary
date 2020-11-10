import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { BOOK_TYPE } from '../book.model';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: new Date().toISOString() })
  publication_date: string;

  // @ApiProperty({ type: 'file', required: true })
  @ApiPropertyOptional({ type: 'file', })
  cover: any;

  @IsDefined()
  @IsIn([BOOK_TYPE.PRIVET, BOOK_TYPE.PUBLIC])
  @ApiProperty({ example: 'PUBLIC' })
  type: BOOK_TYPE;
}
