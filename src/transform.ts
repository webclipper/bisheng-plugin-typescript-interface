interface IFieldMeta {
  base: {
    [key: string]: string;
  };
  i18n: {
    [language: string]: IFieldMeta['base'];
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

/**
 *
 * @param _ 用户字段的备注
 *
 * @param _ comments of field
 */
export function transformCommentsToFieldMeta(_: string[]): IFieldMeta {
  return {} as any;
}

export function parserComment(comment: string): IFieldMeta['base'] {
  const lines = comment.match(/@[a-z]* .*/g);
  const result: IFieldMeta['base'] = {};
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
