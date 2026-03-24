import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';

export function createSessionRoutes(sessionController: SessionController): Router {
  const router = Router();

  router.post('/', sessionController.createSession);
  router.post('/join', sessionController.joinSession);
  router.get('/:sessionId/participants', sessionController.getSessionParticipants);

  return router;
}
