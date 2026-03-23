import { Request, Response } from 'express';
import { SessionService } from '../services/session.service';
import { ParticipantService } from '../../participant/services/participant.service';

export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly participantService: ParticipantService,
  ) {}

  createSession = async (request: Request, response: Response): Promise<void> => {
    try {
      const { mode } = request.body;
      const session = await this.sessionService.createSession({ mode });

      response.status(201).json(session);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : 'Erro ao criar sessao.',
      });
    }
  };

  joinSession = async (request: Request, response: Response): Promise<void> => {
    try {
      const { sessionCode, participant } = request.body;

      const session = await this.sessionService.findByCode(sessionCode);

      if (!session) {
        response.status(404).json({ message: 'Sala nao encontrada.' });
        return;
      }

      const createdParticipant = await this.participantService.createParticipant({
        sessionId: session.id,
        name: participant.name,
        speakLocale: participant.speakLocale,
        listenLocale: participant.listenLocale,
        speakCountry: participant.speakCountry,
        listenCountry: participant.listenCountry,
      });

      const participants = await this.participantService.listBySessionId(session.id);

      response.status(200).json({
        session,
        participant: createdParticipant,
        participants,
      });
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : 'Erro ao entrar na sessao.',
      });
    }
  };

  getSessionParticipants = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      const { sessionId } = request.params;
      const normalizedSessionId = Array.isArray(sessionId) ? sessionId[0] : sessionId;
      const participants = await this.participantService.listBySessionId(normalizedSessionId);

      response.status(200).json(participants);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : 'Erro ao listar participantes.',
      });
    }
  };
}
