import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('ini di service\n');
    return 'Hello World!';
  }

  getBaru(): number {
    return 15;
  }
}
