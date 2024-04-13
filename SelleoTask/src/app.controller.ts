import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  home() {
    return {};
  }
}
