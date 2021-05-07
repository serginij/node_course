import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class MainService {
  async renderMain(@Res() res) {
    res.render('index', {
      title: 'Main page',
    });
  }
}
