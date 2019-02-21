import assert = require('power-assert');
import { parserTableConfig, jsonToMarkdownTable } from '../src/utils';

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
            filePath: '1'
          })
        );
      }, /interfaceName is required/);
    });
    it('should should be default value when columnNames is empty', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
            columnNames: []
          })
        ).columnNames,
        ['name', 'description', 'types', 'default', 'optional']
      );
    });
    it('should should be default value when columnNames is undefined', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2'
          })
        ).columnNames,
        ['name', 'description', 'types', 'default', 'optional']
      );
    });
    it('should parse correct', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
            columnNames: ['1', '2'],
            language: '1'
          })
        ),
        {
          filePath: '1',
          interfaceName: '2',
          columnNames: ['1', '2'],
          language: '1'
        }
      );
    });
  });
});

describe('test jsonToMarkdownTable', () => {
  let columns = ['a', 'b', 'c'];

  let rows = [
    {
      a: 'asdfa',
      b: '239487',
      c: '234'
    },
    {
      a: 'sdf',
      b: 'gsdf',
      c: 'sfd'
    }
  ];

  it('it should work correct', () => {
    assert.equal(
      jsonToMarkdownTable(rows, columns),
      [
        '|a | b | c|',
        '|---|---|---|',
        '|asdfa|239487|234|',
        '|sdf|gsdf|sfd|'
      ].join('\r\n')
    );
  });
});
