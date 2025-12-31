import { describe, it, expect, vi } from 'vitest';
import logger from '@/services/logger';

describe('Logger', () => {
    it('should log info messages', () => {
        const spy = vi.spyOn(console, 'log');
        logger.info({ test: 'context' }, 'Test message');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('should log warn messages', () => {
        const spy = vi.spyOn(console, 'warn');
        logger.warn({ test: 'context' }, 'Warn message');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('should log error messages', () => {
        const spy = vi.spyOn(console, 'error');
        logger.error({ test: 'context' }, 'Error message');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});
