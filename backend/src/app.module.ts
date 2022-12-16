import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { ChatModule } from './Chat/chat.module'

@Module({
  controllers: [AppController],
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'beagle',
    }),
    ChatModule,
  ],
})
export class AppModule {}
