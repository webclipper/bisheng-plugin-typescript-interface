import { readInterfaceAstByName } from '../../src/transform';
import assert = require('power-assert');
import * as path from 'path';

describe('test transform/index.ts', () => {
  console.log();

  describe('test readInterfaceAstByName', () => {
    it('should return null when file not exist', () => {
      assert.equal(
        readInterfaceAstByName(
          path.resolve(__dirname, './fixtures/notExist.tsx'),
          'ITestInterface'
        ),
        null
      );
    });
    it('should return null when interface name is correct', () => {
      assert.equal(
        readInterfaceAstByName(
          path.resolve(__dirname, './fixtures/fixtures.tsx'),
          'error'
        ),
        null
      );
    });
    it('should get ast when input is correct', () => {
      assert.notEqual(
        readInterfaceAstByName(
          path.resolve(__dirname, './fixtures/fixtures.tsx'),
          'ITestInterface'
        ),
        null
      );
    });
  });
});
