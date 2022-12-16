import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ChatType } from '../enums/type.enum'
import { From } from '../types/from.type'

export type ChatDocument = Document & Chat

@Schema({ collection: 'chats' })
export class Chat {
  /**
   * These are the common data types between,
   *
   * both message and a notification
   */
  @Prop()
  value: string

  @Prop()
  room: string

  @Prop()
  type: ChatType

  /**
   * These are the unique data types for a message
   */
  @Prop({ require: false })
  from: From

  @Prop({ required: false })
  time: string
}

export const chatSchema = SchemaFactory.createForClass(Chat)
