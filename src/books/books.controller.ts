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
import { GuardPrivetData } from '../auth/guard-privet-data.guard';
import { User } from '../auth/user.model';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/creat-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export type RequestWithUser = Request & { user: User };
@Controller('books')
export class BooksController {
  constructor(private readonly bookServices: BooksService) {}

  @Get()
  @UseGuards(GuardPrivetData)
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

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('cover', { limits: { fileSize: 1000 } }))
  CreateBook(
    @UploadedFile() file,
    @Body(ValidationPipe) createBookDTO: CreateBookDto,
    @Req() request: RequestWithUser,
  ): Promise<Book> {
    return this.bookServices.CreateBook(file, createBookDTO, request.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  UpdateBook(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBookDTO: UpdateBookDto,
  ): Promise<Book> {
    return this.bookServices.UpdateBook(id, updateBookDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  DeleteBook(@Param('id') id: string): Promise<void> {
    return this.bookServices.DeleteBook(id);
  }
}
