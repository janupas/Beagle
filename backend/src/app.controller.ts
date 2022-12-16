import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  get(): string {
    return 'welcome to my nestjs api'
  }
}
