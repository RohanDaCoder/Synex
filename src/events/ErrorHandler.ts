import { logger } from '../services/logger';

export class ErrorHandler {
  execute(error: Error): void {
    logger.error('Unhandled error', error);
  }
}
