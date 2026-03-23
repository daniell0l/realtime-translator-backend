import { Request, Response } from 'express';
import { SessionService } from '../services/session.service';
import { ParticipantService } from '../../participant/services/participant.service';

export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly participantService: ParticipantService,
  ) {}

  createSession = (request: Request, response: Response): void => {
    const { mode } = request.body;

    const session = this.sessionService.createSession({ mode });

    response.status(201).json(session);
  };

  joinSession = (request: Request, response: Response): void => {
    const { sessionCode, participant } = request.body;

    const session = this.sessionService.findByCode(sessionCode);

    if (!session) {
      response.status(404).json({ message: 'Sala não encontrada.' });
      return;
    }

    const createdParticipant = this.participantService.createParticipant({
      sessionId: session.id,
      name: participant.name,
      speakLocale: participant.speakLocale,
      listenLocale: participant.listenLocale,
      speakCountry: participant.speakCountry,
      listenCountry: participant.listenCountry,
    });

    response.status(200).json({
      session,
      participant: createdParticipant,
      participants: this.participantService.listBySessionId(session.id),
    });
  };

  getSessionParticipants = (request: Request, response: Response): void => {
    const { sessionId } = request.params;

    const participants = this.participantService.listBySessionId(
      Array.isArray(sessionId) ? sessionId[0] : sessionId,
    );

    response.status(200).json(participants);
  };
}