interface IMeta {
  [key: string]: string;
}

export interface IFieldMeta {
  base: IMeta;
  i18n: {
    [language: string]: IMeta;
  };
}

interface IField {
  /**
   * @language en-US
   * @description name of fields
   */
  /**
   * @language zh-CN
   * @description 字段名
   */
  name: string;

  /**
   * @language zh-CN
   * @description 字段是否可选(即有没有问号)
   */
  optional: boolean;

  /**
   * @language zh-CN
   * @description 字段类型
   */
  types: string;

  /**
   * @language zh-CN
   * @description 字段信息，用户备注。
   */
  meta: IFieldMeta;
}

export function mergeFieldMeta(metaList: IMeta[]): IFieldMeta {
  const result: IFieldMeta = {
    base: {},
    i18n: {}
  };
  if (!Array.isArray(metaList) || metaList.length === 0) {
    return result;
  }
  for (const meta of metaList) {
    const { language } = meta;
    if (language) {
      result.i18n[language] = Object.assign({}, result.i18n[language], meta);
    } else {
      result.base = Object.assign({}, result.base, meta);
    }
  }
  return result;
}

export function getMetaByLanguage(meta: IFieldMeta, language?: string): IMeta {
  return Object.assign({}, meta.base, meta.i18n[language]);
}

export function parserComment(comment: string): IMeta {
  const lines = comment.match(/@[a-z]* .*/g);
  const result: IMeta = {};
  for (const line of lines) {
    const data = line.match(/@([a-z]*) (.*)/);
    if (data && data[2]) {
      result[data[1]] = data[2].trim();
    }
  }

  return result;
}

export function transformer(_: string, __: string): IField[] {
  return [];
}
