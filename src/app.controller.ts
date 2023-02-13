import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('ini di controller\n');
    return this.appService.getHello();
  }

  @Get('/baru')
  getBaru(): number {
    return this.appService.getBaru();
  }
}
