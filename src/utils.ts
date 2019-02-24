export interface ITableConfig {
  filePath: string;
  interfaceName: string;
  language: string;
  columnNames?: IColumn[];
  exclude?: string[];
}

export interface IPluginTableConfig {
  base: {
    columnNames?: IColumn[];
    exclude?: string[];
  };
  i18n: {
    [language: string]: {
      columnNames?: IColumn[];
      exclude?: string[];
    };
  };
}

export interface IColumn {
  label: string;
  key: string;
}

export function parserTableConfig(
  tableConfig: string,
  encodeConfig?: string
): ITableConfig {
  const config: ITableConfig = JSON.parse(tableConfig);
  const { filePath, interfaceName, columnNames, language, exclude } = config;
  if (!filePath) {
    throw new Error('filePath is required');
  }
  if (!interfaceName) {
    throw new Error('interfaceName is required');
  }
  const result: ITableConfig = { filePath, interfaceName, language };
  if (encodeConfig) {
    let pluginTableConfig: IPluginTableConfig = {
      base: {},
      i18n: {}
    };
    try {
      pluginTableConfig = JSON.parse(
        Buffer.from(encodeConfig, 'base64').toString()
      );
    } catch (error) {
      throw new Error('decode plugin config error');
    }
    const pluginTableConfigByLanguage = Object.assign(
      {},
      pluginTableConfig.base,
      pluginTableConfig.i18n[language]
    );
    result.columnNames = pluginTableConfigByLanguage.columnNames;
    result.exclude = pluginTableConfigByLanguage.exclude;
  } else {
    result.columnNames = [
      { label: 'Property', key: 'name' },
      { label: 'Description', key: 'description' },
      { label: 'Type', key: 'types' },
      { label: 'Default', key: 'default' }
    ];
  }
  if (Array.isArray(columnNames) && columnNames.length > 0) {
    result.columnNames = columnNames;
  }
  if (Array.isArray(exclude)) {
    result.exclude = exclude;
  }
  return result;
}

export function jsonToMarkdownTable(
  rows: {
    [column: string]: string;
  }[],
  columns: IColumn[]
) {
  const result = [];
  result.push(`|${columns.map(o => o.label).join(' | ')}|`);
  result.push(`|${columns.map(_ => '---').join('|')}|`);
  for (const row of rows) {
    result.push(
      `|${columns.map(({ key }) => (row[key] ? row[key] : '-')).join('|')}|`
    );
  }
  return result.join('\r\n');
}
