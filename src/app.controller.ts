import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/books', 302)
  index() {
    return;
  }
}
