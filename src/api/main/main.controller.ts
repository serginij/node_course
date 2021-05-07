import { Controller, Get, Res } from '@nestjs/common';
import { MainService } from './main.service';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('/')
  renderMain(@Res() res) {
    console.log('Hello from mainController');
    return this.mainService.renderMain(res);
  }
}
