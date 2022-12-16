import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app: NestApplication = await NestFactory.create(AppModule)

  app.listen(5000)
}

bootstrap()
