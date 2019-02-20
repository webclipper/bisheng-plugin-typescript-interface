import { parserTableConfig } from '../utils';

describe('test utils', () => {
  describe('test parserTableConfig', () => {
    it('should throw error when filePath is null', () => {
      try {
        parserTableConfig('{}');
      } catch (error) {
        expect(error.message).toBe('filePath is required');
      }
    });
  });
});
