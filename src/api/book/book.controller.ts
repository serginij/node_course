import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAll(@Res() res) {
    return this.bookService.getAll(res);
  }

  @Get('/create')
  getNewBookPage(@Res() res) {
    return this.bookService.renderNewBook(res);
  }

  @Get('/update/:id')
  getUpdateBookPage(@Req() req, @Res() res) {
    return this.bookService.renderBookById(req, res);
  }

  @Get('/:id')
  getBookById(@Req() req, @Res() res) {
    return this.bookService.getBook(req, res);
  }

  // TODO: add file middleware
  @Post('/create')
  createBook(@Req() req, @Res() res) {
    return this.bookService.createBook(req, res);
  }

  // TODO: add file middleware
  @Post('/update/:id')
  updateBook(@Req() req, @Res() res) {
    return this.bookService.updateBook(req, res);
  }

  @Post('/delete/:id')
  deleteBook(@Req() req, @Res() res) {
    return this.bookService.deleteBook(req, res);
  }

  @Get('/:id/download')
  downloadBookById(@Req() req, @Res() res) {
    return this.bookService.downloadBook(req, res);
  }
}
