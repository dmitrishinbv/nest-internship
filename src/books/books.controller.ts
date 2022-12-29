import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create.dto';
import { Book } from './books.interface';
import { BooksService } from './books.service';
import { BookStatusValidationPipe } from './pipes/status-validation.pipe';

@Controller('/books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  get(): Book[] {
    return this.bookService.getAll();
  }

  // @Post()
  // create(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Book {
  //   return this.bookService.createBook(title, description);
  // }
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.bookService.createBook(createBookDto);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BookStatusValidationPipe) status: string,
  ) {
    return this.bookService.updateBook(id, status);
  }
}
