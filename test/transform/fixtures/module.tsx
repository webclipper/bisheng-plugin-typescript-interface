// @ts-ignore
import * as React from 'react';
// @ts-ignore
import { ModalLocale } from '../modal/locale';

interface Locale {
  locale: string;
  Pagination?: Object;
  DatePicker?: Object;
  TimePicker?: Object;
  Calendar?: Object;
  Table?: Object;
  Modal?: ModalLocale;
  Popconfirm?: Object;
  Transfer?: Object;
  Select?: Object;
  Upload?: Object;
}

export interface LocaleProviderProps {
  /**
   * @language en-US
   * @description language package setting, you can find the packages in [antd/lib/locale-provider](http://unpkg.com/antd/lib/locale-provider/)
   */
  /**
   * @language zh-CN
   * @description 语言包配置，语言包可到 [antd/lib/locale-provider](http://unpkg.com/antd/lib/locale-provider/) 目录下寻找
   */
  locale: Locale;
  children?: React.ReactNode;
}
