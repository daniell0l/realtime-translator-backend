import { Request, Response } from 'express';
import { CreateSessionUseCase } from '../../../useCases/create-session.use-case';
import { FindSessionByCodeUseCase } from '../../../useCases/find-session-by-code.use-case';
import { JoinSessionDto } from '../../../types/dtos/join-session.dto';
import { isSessionMode } from '../../../types/session-mode';
import { CreateParticipantUseCase } from '../../../../participant/useCases/create-participant.use-case';
import { ListParticipantsBySessionUseCase } from '../../../../participant/useCases/list-participants-by-session.use-case';

export class SessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly findSessionByCodeUseCase: FindSessionByCodeUseCase,
    private readonly createParticipantUseCase: CreateParticipantUseCase,
    private readonly listParticipantsBySessionUseCase: ListParticipantsBySessionUseCase,
  ) {}

  createSession = async (request: Request, response: Response): Promise<void> => {
    try {
      const { mode } = request.body as { mode?: unknown };

      if (!isSessionMode(mode)) {
        response.status(400).json({ message: 'Modo de sessao invalido.' });
        return;
      }

      const session = await this.createSessionUseCase.execute({ mode });
      response.status(201).json(session);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : 'Erro ao criar sessao.',
      });
    }
  };

  joinSession = async (request: Request, response: Response): Promise<void> => {
    try {
      const { sessionCode, participant } = request.body as JoinSessionDto;

      if (!sessionCode || !participant?.name) {
        response.status(400).json({ message: 'Payload de entrada invalido.' });
        return;
      }

      const session = await this.findSessionByCodeUseCase.execute(sessionCode);

      if (!session) {
        response.status(404).json({ message: 'Sala nao encontrada.' });
        return;
      }

      const createdParticipant = await this.createParticipantUseCase.execute({
        sessionId: session.id,
        name: participant.name,
        speakLocale: participant.speakLocale,
        listenLocale: participant.listenLocale,
        speakCountry: participant.speakCountry,
        listenCountry: participant.listenCountry,
      });

      const participants = await this.listParticipantsBySessionUseCase.execute(session.id);

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
      const normalizedSessionId = Array.isArray(sessionId)
        ? sessionId[0]
        : sessionId;

      if (!normalizedSessionId) {
        response.status(400).json({ message: 'sessionId eh obrigatorio.' });
        return;
      }

      const participants = await this.listParticipantsBySessionUseCase.execute(
        normalizedSessionId,
      );
      response.status(200).json(participants);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : 'Erro ao listar participantes.',
      });
    }
  };
}
