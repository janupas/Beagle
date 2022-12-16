import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ChatGateway } from './chat.gateway'
import { Chat, chatSchema } from './schema/chat.schema'
import { ChatService } from './this.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: chatSchema,
      },
    ]),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
