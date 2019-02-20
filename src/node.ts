import { parserTableConfig } from './utils';

interface IPluginConfig {
  lang?: string;
}

export = (
  markdownData: any,
  { lang = 'typescriptInterface' }: IPluginConfig,
) => {
  const { content } = markdownData;
  if (Array.isArray(content)) {
    markdownData.content = content.map((node: any) => {
      const tagName = node[0];
      const attr = node[1];
      if (tagName === 'pre' && attr && attr.lang === lang) {
        parserTableConfig(node[2][1]);
      }

      return node;
    });
  }

  return markdownData;
};
