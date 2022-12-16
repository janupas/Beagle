import { ChatType } from '../enums/type.enum'

export interface Message {
  value: string
  from?: {
    id: string
    name: string
  }
  time?: string
  room: string
  type: ChatType
}
