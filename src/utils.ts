export interface ITableConfig {
  filePath: string;
  interfaceName: string;
  language: string;
  columnNames?: IColumn[];
  exclude?: string[];
}

export interface IColumn {
  label: string;
  key: string;
}

export function parserTableConfig(tableConfig: string): ITableConfig {
  const config: ITableConfig = JSON.parse(tableConfig);

  const { filePath, interfaceName, columnNames, language, exclude } = config;

  if (!filePath) {
    throw new Error('filePath is required');
  }
  if (!interfaceName) {
    throw new Error('interfaceName is required');
  }

  const result: ITableConfig = { filePath, interfaceName, language };
  if (Array.isArray(columnNames) && columnNames.length > 0) {
    result.columnNames = columnNames;
  } else {
    result.columnNames = [
      { label: 'Property', key: 'name' },
      { label: 'Description', key: 'description' },
      { label: 'Type', key: 'types' },
      { label: 'Default', key: 'default' }
    ];
  }
  if (Array.isArray(exclude) && exclude.length > 0) {
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
