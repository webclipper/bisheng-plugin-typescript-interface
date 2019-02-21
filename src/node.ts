import { parserTableConfig, jsonToMarkdownTable } from './utils';
import {
  readInterfaceAstByName,
  parserTsInterfaceDeclaration
} from './transform';
import { getFieldMetaByLanguage } from './transform/index';
const MT = require('mark-twain');
import * as path from 'path';

interface IPluginConfig {
  lang?: string;
}

export = (
  markdownData: any,
  { lang = 'typescriptInterface' }: IPluginConfig
) => {
  const { content } = markdownData;
  if (Array.isArray(content)) {
    markdownData.content = content
      .map((node: any) => {
        const tagName = node[0];
        const attr = node[1];
        if (tagName === 'pre' && attr && attr.lang === lang) {
          const {
            language,
            filePath,
            interfaceName,
            columnNames
          } = parserTableConfig(node[2][1]);
          const fields = parserTsInterfaceDeclaration(
            readInterfaceAstByName(
              path.resolve(process.cwd(), filePath),
              interfaceName
            )
          );
          return MT(
            jsonToMarkdownTable(
              fields.map(o => getFieldMetaByLanguage(o, language)),
              columnNames
            )
          ).content[1];
        }
        return node;
      })
      .filter(o => !!o);
  }

  return markdownData;
};
