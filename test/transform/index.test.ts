import {
  readInterfaceAstByName,
  parserTsInterfaceDeclaration,
  getFieldMetaByLanguage
} from '../../src/transform';
import assert = require('power-assert');
import * as path from 'path';

describe('test transform/index.ts', () => {
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
      parserTsInterfaceDeclaration(
        readInterfaceAstByName(
          path.resolve(__dirname, './fixtures/fixtures.tsx'),
          'ITestInterface'
        )
      );

      assert.notEqual(
        readInterfaceAstByName(
          path.resolve(__dirname, './fixtures/fixtures.tsx'),
          'ITestInterface'
        ),
        null
      );
    });
  });

  describe('test parserTsInterfaceDeclaration', () => {
    const data = parserTsInterfaceDeclaration(
      readInterfaceAstByName(
        path.resolve(__dirname, './fixtures/fixtures.tsx'),
        'ITestInterface'
      )
    );
    assert.deepEqual(data.length, 5);
  });

  describe('test getFieldMetaByLanguage', () => {
    it('h', () => {
      assert.deepEqual(
        getFieldMetaByLanguage(
          {
            name: 'one',
            types: 'boolean',
            optional: 'true'
          },
          'zh-CN'
        ),
        {
          name: 'one',
          types: 'boolean',
          optional: 'true'
        }
      );
    });

    assert.deepEqual(
      getFieldMetaByLanguage(
        {
          name: 'one',
          types: 'boolean',
          optional: 'true',
          meta: {
            base: {
              baseData: 'baseData',
              description: 'newDescription'
            },
            i18n: {
              ['en-US']: {
                language: 'en-US',
                description: 'english description',
                otherInfo: 'other info'
              },
              ['zh-CN']: {
                language: 'zh-CN',
                description: '中文信息',
                otherInfo: '其他信息'
              }
            }
          }
        },
        'zh-CN'
      ),
      {
        name: 'one',
        optional: 'true',
        types: 'boolean',
        baseData: 'baseData',
        description: '中文信息',
        language: 'zh-CN',
        otherInfo: '其他信息'
      }
    );
  });
});
