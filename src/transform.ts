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
function transformCommentsToFieldMeta(_: string[]): IFieldMeta {
  return {} as any;
}

function parserComment(_: string): IFieldMeta['base'] {
  return {} as any;
}

function transformer(_: string, __: string): IField[] {
  return [];
}
