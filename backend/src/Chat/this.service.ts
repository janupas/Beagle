import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Chat, ChatDocument } from './schema/chat.schema'
import { Model } from 'mongoose'
import { Message } from './interfaces/message.interface'

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModal: Model<ChatDocument>) {}

  /**
   * Add a message to the database
   */
  addMessage(message: Message) {
    const newMessage = new this.chatModal(message)

    return newMessage.save()
  }

  /**
   * Get messages from a specific chat room
   */
  async getMessagesFromASpecificChatRoom(room: string): Promise<any> {
    return this.chatModal.find({ room }).limit(100)
  }
}
