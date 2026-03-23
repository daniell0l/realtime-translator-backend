import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';

export class ChatGateway {
  constructor(
    private readonly io: Server,
    private readonly chatService: ChatService,
  ) {}

  registerEvents(socket: Socket): void {
    socket.on('session:join_room', (sessionId: string) => {
      socket.join(sessionId);
    });

    socket.on(
      'chat:send_message',
      async (payload: { sessionId: string; senderId: string; text: string }) => {
        try {
          const message = await this.chatService.sendMessage(payload);

          this.io.to(payload.sessionId).emit('chat:message_received', message);
        } catch (error) {
          socket.emit('chat:error', {
            message: error instanceof Error ? error.message : 'Erro ao enviar mensagem.',
          });
        }
      },
    );
  }
}