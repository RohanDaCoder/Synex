import { logger } from '../utils/logger';

export class ErrorHandler {
	execute(error: Error): void {
		logger.error('Unhandled error', error);
	}
}
