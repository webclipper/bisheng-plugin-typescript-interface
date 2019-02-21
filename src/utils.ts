export interface ITableConfig {
  filePath: string;
  interfaceName: string;
  columnNames?: string[];
}

export function parserTableConfig(tableConfig: string): ITableConfig {
  const config: ITableConfig = JSON.parse(tableConfig);

  const { filePath, interfaceName, columnNames } = config;

  if (!filePath) {
    throw new Error('filePath is required');
  }
  if (!interfaceName) {
    throw new Error('interfaceName is required');
  }

  return {
    filePath,
    interfaceName,
    columnNames:
      Array.isArray(columnNames) && columnNames.length > 0
        ? columnNames
        : ['property', 'description', 'type', 'default', 'optional'],
  };
}
