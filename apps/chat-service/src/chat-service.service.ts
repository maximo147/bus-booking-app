import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { BookingDetailService } from 'apps/booking-service/src/service/booking-detail.service';
import { RoleService } from 'apps/user-service/src/service/role.service';
import { Subscriber } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: {
    origin: 'http://localhost:4200',
    credentials: true 
  }
})
export class ChatServiceService  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private _role : RoleService,
    private _bookigDetail: BookingDetailService
  ){}

  @WebSocketServer() server: Server

  afterInit(server: any) {
    console.log("Bienvenido a ONROAD");
  }

  onGatewayInit(){
    console.log("Alguien se conectó al chat");
  }

  handleConnection(client: any, ...args: any[]){
    console.log("Alguien se conectó al chat");




    client.on('cart-data', (payload) => {
      if(payload !== null){
        this._bookigDetail.getAll().then(x => {
          this.values = x.getData().filter(y => (y.status === false && y.state === true))
        })
      }
      this.server.emit('cart-data2', this.values)
      
      
      
    })
    
  }

  handleDisconnect(client: any, ...args: any[]){
    console.log("Alguien se fue");
    
  }

  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string ){
   client.join(`room_${room}`) 
  }

  @SubscribeMessage('typing')
  handleTyping(
    client: Socket,
    payload: {value: any}
  ){
    client.broadcast.emit('typing', payload)
  }

  @SubscribeMessage('event_message')
  handleMessage(
    client: Socket,
    payload: { values: any, message: string}
  ){
    this.server.emit('new_message', payload);
    //this.server.to(`room_${room}`).emit('new_message', message);
    
  }


  values: any[] = []
  /*
  @SubscribeMessage('cart-data')
  handleCart(
    client: Socket,
    payload: string
  ){
    
    if(payload !== null){
      this._bookigDetail.getAll().then(x => {
        this.values = x.getData().filter(y => (y.status === false && y.state === true && y.user.id_user === payload))
      })
    }
  
    client.emit('cart-data', this.values)
    
  }
  */


  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room: string){
    console.log(`Chau de room ${room}`);
    client.leave(`room_${room}`)
    
  }


 
}
