import { Controller, Get, Res, HttpStatus, UseGuards, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getHello());
  }

  @Version('2')
  @Get()
  getHelloV2(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getHelloVersion2());
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('secure')
  getProtectedResource(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getSecureResource());
  }
}
