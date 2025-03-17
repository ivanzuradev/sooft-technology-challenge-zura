import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @ApiResponse({
    status: 200,
    description: 'App levantada.',
    example: 'UP!',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @ApiResponse({
    status: 200,
    description: 'App levantada.',
    example: 'Pong!',
  })
  @Get('/ping')
  getPing(): string {
    return 'Pong!';
  }
}
