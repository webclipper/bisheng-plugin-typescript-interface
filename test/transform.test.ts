import { parserComment } from '../src/transform';
import assert = require('power-assert');

/**
 * @language en-US
 * @description disabled state of button
 * @empty
 */
describe('test transform', () => {
  describe('test parserComment', () => {
    const comment =
      '/**\n* @language   en-US  \n* @description  disabled state of button   \n* @empty \n*';
    const result = parserComment(comment);

    it('should trim when parser', () => {
      assert.deepEqual(result.language, 'en-US');
      assert.deepEqual(result.description, 'disabled state of button');
    });
    it('should ignore empty value', () => {
      assert.deepEqual(result.empty, undefined);
    });
  });
});
