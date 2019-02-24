import { IPluginTableConfig } from './../src/utils';
import assert = require('power-assert');
import { parserTableConfig, jsonToMarkdownTable } from '../src/utils';

describe('test utils', () => {
  describe('test parserTableConfig', () => {
    const pluginConfig: IPluginTableConfig = {
      base: {
        exclude: ['children']
      },
      i18n: {
        'zh-CN': {
          columnNames: [{ label: '中文', key: 'name' }]
        }
      }
    };

    const encodeConfig = (config: IPluginTableConfig) => {
      return Buffer.from(JSON.stringify(config)).toString('base64');
    };

    describe('test encodeConfig in parserTableConfig', () => {
      it('exclude should be equal to pluginConfig when exclude is undefined', () => {
        assert.deepEqual(
          parserTableConfig(
            JSON.stringify({
              filePath: '1',
              interfaceName: '2'
            }),
            encodeConfig(pluginConfig)
          ).exclude,
          pluginConfig.base.exclude
        );
        assert.deepEqual(
          parserTableConfig(
            JSON.stringify({
              filePath: '1',
              interfaceName: '2',
              exclude: []
            }),
            encodeConfig(pluginConfig)
          ).exclude,
          []
        );
      });
      it('should equal to pluginConfig.i18n[\'zh-CN\'].columnNames when language is zh-CN', () => {
        assert.deepEqual(
          parserTableConfig(
            JSON.stringify({
              filePath: '1',
              interfaceName: '2',
              language: 'zh-CN'
            }),
            encodeConfig(pluginConfig)
          ).columnNames,
          pluginConfig.i18n['zh-CN'].columnNames
        );
        assert.deepEqual(
          parserTableConfig(
            JSON.stringify({
              filePath: '1',
              interfaceName: '2',
              language: 'zh-CN',
              columnNames: [{ label: '自定义', key: 'name' }]
            }),
            encodeConfig(pluginConfig)
          ).columnNames,
          [{ label: '自定义', key: 'name' }]
        );
      });
    });

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
    it('should throw error when plugin config is error', () => {
      const config = JSON.stringify({
        filePath: '1',
        interfaceName: '2'
      });
      assert.throws(() => {
        parserTableConfig(config, 'error');
      }, /decode plugin config error/);
    });

    it('should be default value when columnNames is empty', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
            columnNames: []
          })
        ).columnNames,
        [
          { label: 'Property', key: 'name' },
          { label: 'Description', key: 'description' },
          { label: 'Type', key: 'types' },
          { label: 'Default', key: 'default' }
        ]
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
        [
          { label: 'Property', key: 'name' },
          { label: 'Description', key: 'description' },
          { label: 'Type', key: 'types' },
          { label: 'Default', key: 'default' }
        ]
      );
    });
    it('should parse correct', () => {
      assert.deepEqual(
        parserTableConfig(
          JSON.stringify({
            filePath: '1',
            interfaceName: '2',
            columnNames: [
              { label: '属性', key: 'name' },
              { label: '说明', key: 'description' },
              { label: '类型', key: 'types' },
              { label: '默认值', key: 'default' }
            ],
            exclude: ['a', 'b'],
            language: '1'
          })
        ),
        {
          filePath: '1',
          interfaceName: '2',
          columnNames: [
            { label: '属性', key: 'name' },
            { label: '说明', key: 'description' },
            { label: '类型', key: 'types' },
            { label: '默认值', key: 'default' }
          ],
          exclude: ['a', 'b'],
          language: '1'
        }
      );
    });
  });
});

describe('test jsonToMarkdownTable', () => {
  let columns = [
    { label: 'a', key: 'a' },
    { label: 'b', key: 'b' },
    { label: 'c', key: 'c' }
  ];

  let rows = [
    {
      a: 'asdfa',
      b: '239487',
      c: '234'
    },
    {
      a: 'sdf',
      b: undefined,
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
        '|sdf|-|sfd|'
      ].join('\r\n')
    );
  });
});
