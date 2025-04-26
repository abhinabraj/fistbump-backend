import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway {
  @SubscribeMessage('ping')
  handlePing(client, payload) {
    client.send('pong');
  }
}
