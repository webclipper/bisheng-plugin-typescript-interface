export interface ITableConfig {
  filePath: string;
  interfaceName: string;
  language: string;
  columnNames?: string[];
}

export function parserTableConfig(tableConfig: string): ITableConfig {
  const config: ITableConfig = JSON.parse(tableConfig);

  const { filePath, interfaceName, columnNames, language } = config;

  if (!filePath) {
    throw new Error('filePath is required');
  }
  if (!interfaceName) {
    throw new Error('interfaceName is required');
  }

  return {
    filePath,
    interfaceName,
    language,
    columnNames:
      Array.isArray(columnNames) && columnNames.length > 0
        ? columnNames
        : ['name', 'description', 'types', 'default', 'optional']
  };
}

export function jsonToMarkdownTable(
  rows: {
    [column: string]: string;
  }[],
  columns: string[]
) {
  const result = [];
  result.push(`|${columns.join(' | ')}|`);
  result.push(`|${[...columns].fill('---').join('|')}|`);
  for (const row of rows) {
    result.push(
      `|${columns.map(key => (row[key] ? row[key] : '-')).join('|')}|`
    );
  }
  return result.join('\r\n');
}
