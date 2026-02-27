import { FormConfigProps } from '../type';

export type IconConfig = {
  /**
   * Icon: ()=> <div/>
   */
  icon?: React.FC<any>;
  /**
   * tooltip text
   */
  tooltip?: string;
};

export type FormListFieldData<Schema> = {
  value: Schema;
  key: number;
  idx: number;
  id: string | number;
};

export type FormListOperation = {
  add: (defaultValue?: any, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
};
export type FormListActionType<T = any> = FormListOperation & {
  get: (index: number) => T | undefined;
  getList: () => T[] | undefined;
};

export type FormListCommonProps = {
  /**
   * icon config for copy action
   */
  copyIcon?: IconConfig | false;

  /**
   * icon config for delete action
   */
  deleteIcon?: IconConfig | false;

  /**
   * icon config for add action
   */
  addIcon?: IconConfig | false;

  /**
   * Function that generates default values for new items
   */
  creatorRecord?: Record<string, any> | (() => Record<string, any>);

  className?: HTMLElement['className'];

  containerStyle?: React.CSSProperties;
};

export type FormListProps<T> = FormListCommonProps &
  Omit<FormConfigProps, 'label'> & {
    initialValue?: Record<string, any>[];
    children: (
      fields: FormListFieldData<T>[],
      operation: FormListOperation
    ) => React.ReactNode;

    onAfterAdd?: (...params: [...Parameters<FormListOperation['add']>]) => void;

    onAfterRemove?: (
      ...params: [...Parameters<FormListOperation['remove']>, number]
    ) => void;

    emptyList?: React.ReactNode;

    actionRef?: React.RefObject<FormListActionType<T> | undefined>;

    min?: number;

    /**
     * Maximum number of items allowed in the list
     */
    max?: number;
  };
