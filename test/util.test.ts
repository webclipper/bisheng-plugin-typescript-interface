import assert = require('power-assert');
import { parserTableConfig } from '../src/utils';

describe('test utils', () => {
  describe('test parserTableConfig', () => {
    it('should throw error when filePath is undefined', () => {
      assert.throws(() => {
        parserTableConfig('{}');
      }, /filePath is required/);
    });
    it('should throw error when interfaceName is undefined', () => {
      assert.throws(() => {
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
          }),
        );
      }, /interfaceName is required/);
    });
    it('should should be default value when columnNames is empty', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
            columnNames: [],
          }),
        ).columnNames,
        ['property', 'description', 'type', 'default', 'optional'],
      );
    });
    it('should should be default value when columnNames is undefined', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
          }),
        ).columnNames,
        ['property', 'description', 'type', 'default', 'optional'],
      );
    });
    it('should parse correct', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
            columnNames: ['1', '2'],
          }),
        ),
        {
          filePath: '1',
          interfaceName: '2',
          columnNames: ['1', '2'],
        },
      );
    });
  });
});
