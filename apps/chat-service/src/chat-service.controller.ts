import { Controller, Get } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';
import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@Controller()
export class ChatServiceController {
  constructor(private readonly chatServiceService: ChatServiceService) {}

  @Get()
  public connect(client: any, value: any){
    this.chatServiceService.handleConnection(client, value)
  }
 
}
