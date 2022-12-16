import { Logger, OnModuleInit } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JoinUserDTO } from './dto/join-user.dto'
import { User } from './interfaces/user.interface'
import { Message } from './interfaces/message.interface'
import { ChatService } from './this.service'
import { ChatType } from './enums/type.enum'

@WebSocketGateway(5001, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server

  private socket: Socket
  private users: Array<User>
  private readonly logger = new Logger(ChatGateway.name)

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.users = []

    this.server.on('connection', (socket) => {
      this.socket = socket
      this.logger.log(`User connected with the id: ${socket.id}`)
    })
  }

  /**
   * This function will handle the event for joining
   *
   * This will trigger when a user joined to a room
   */
  @SubscribeMessage('join')
  async handleJoin(@MessageBody() joinUserDto: JoinUserDTO) {
    this.logger.log(joinUserDto)

    // Joining to the room specified by the user
    this.socket.join(joinUserDto.room)

    this.server.to(joinUserDto.room).emit('user-changed', {
      value: `${joinUserDto.name} just joined`,
    })

    /**
     * Adding the notification to the database
     */
    this.chatService.addMessage({
      value: `${joinUserDto.name} just joined`,
      room: joinUserDto.room,
      type: ChatType.notification,
    })
    this.users.push({
      id: joinUserDto.id,
      username: joinUserDto.name,
      room: joinUserDto.room,
    })

    this.server.to(joinUserDto.room).emit('load-messages', {
      messages: await this.chatService.getMessagesFromASpecificChatRoom(
        joinUserDto.room,
      ),
    })
    this.server.to(joinUserDto.room).emit('users', {
      users: this.users.filter((user) => user.room === joinUserDto.room),
    })
  }

  /**
   * This function will handle the event for messaging
   *
   * This will trigger when a user send a message
   */
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message) {
    this.logger.log(message)

    this.chatService.addMessage({ ...message, type: ChatType.message })
    this.server.to(message.room).emit('message-back', message)
  }

  // TODO FIX HERE
  /**
   * This function will handle the event for disconnecting
   */
  @SubscribeMessage('disconnect')
  handleDisconnect() {
    const user = this.users.find((user) => user.id === this.socket.id)

    if (typeof user?.username !== 'undefined') {
      this.chatService.addMessage({
        value: `${user?.username} just got disconnected`,
        type: ChatType.notification,
        room: user.room,
      })

      this.server.to(user.room).emit('user-changed', {
        value: `${user?.username} just got disconnected`,
      })

      this.users = this.users.filter((user) => user.id !== this.socket.id)
      this.server.emit('users', { users: this.users })

      this.logger.log(this.users)
    }
  }
}
