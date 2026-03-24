import { Server, Socket } from 'socket.io';
import { SendMessageUseCase } from '../../application/use-cases/send-message.use-case';

interface SendMessagePayload {
  sessionId: string;
  senderId: string;
  text: string;
}

export class ChatGateway {
  constructor(
    private readonly io: Server,
    private readonly sendMessageUseCase: SendMessageUseCase,
  ) {}

  registerEvents(socket: Socket): void {
    socket.on('session:join_room', (sessionId: string) => {
      socket.join(sessionId);
    });

    socket.on('chat:send_message', async (payload: SendMessagePayload) => {
      try {
        const message = await this.sendMessageUseCase.execute(payload);
        this.io.to(payload.sessionId).emit('chat:message_received', message);
      } catch (error) {
        socket.emit('chat:error', {
          message: error instanceof Error ? error.message : 'Erro ao enviar mensagem.',
        });
      }
    });
  }
}
