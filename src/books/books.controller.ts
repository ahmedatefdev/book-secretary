import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { type } from 'os';
import { GuardPrivetData } from '../auth/guard-privet-data.guard';
import { User } from '../auth/user.model';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/creat-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export type RequestWithUser = Request & { user: User };
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookServices: BooksService) {}

  @Get()
  @UseGuards(GuardPrivetData)
  @ApiOkResponse({ description: 'List all books' })
  public GetBooks(@Req() { user }: RequestWithUser): Promise<Book[]> {
    return this.bookServices.GetBooks(user);
  }

  @Get(':id')
  @UseGuards(GuardPrivetData)
  GetBookByID(
    @Param('id') id: string,
    @Req() { user }: RequestWithUser,
  ): Promise<Book> {
    return this.bookServices.GetBookByID(id, user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'add book' })
  @ApiUnauthorizedResponse()
  // @ApiBody({ type: CreateBookDto })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('cover', { limits: { fileSize: 1000 } }))
  CreateBook(
    @Body(ValidationPipe) createBookDto: CreateBookDto,
    @Req() request: RequestWithUser,
    @UploadedFile() cover,
  ): Promise<Book> {
    return this.bookServices.CreateBook(createBookDto, request.user, cover);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'update book' })
  @ApiUnauthorizedResponse()
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseGuards(AuthGuard())
  UpdateBook(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBookDTO: UpdateBookDto,
  ): Promise<Book> {
    return this.bookServices.UpdateBook(id, updateBookDTO);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete book' })
  @ApiUnauthorizedResponse()
  @Delete(':id')
  @UseGuards(AuthGuard())
  DeleteBook(@Param('id') id: string): Promise<void> {
    return this.bookServices.DeleteBook(id);
  }
}
