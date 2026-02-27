import type {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';
import { FieldProps, FormModeType } from '../form/type';
import { CommonRefField } from './ref.type';

export type FieldValueType =
  | 'text'
  | 'number'
  | 'email'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'password'
  | 'date'
  | 'time'
  | 'file';

export type FieldRenderPropsType = {
  mode?: FormModeType;
  readonly?: boolean;
};

export type CustomRenderFieldPRopsType = {
  render?: (
    value: any | undefined,
    props: FieldRenderPropsType
  ) => React.ReactNode;
};

export type BaseFieldFCProps = {
  fieldProps?: FieldProps & {
    [key: string]: any;
  };
  autoFocus?: boolean;
  mode?: FormModeType;

  /**
   * The value provider of the field.
   * @default shadcn
   * @type {any}
   */
  adapter?: 'shadcn' | 'antd' | 'custom';
};

export type FieldFCRenderProps = Omit<
  ControllerRenderProps<any, string>,
  'ref'
> &
  ControllerFieldState &
  UseFormStateReturn<any> &
  BaseFieldFCProps & {
    id?: string;
  } & RenderFieldPropsType;

export type FieldPropsType = FieldFCRenderProps & {
  emptyText?: React.ReactNode;
  valueType?: FieldValueType;
};

export type RenderFieldPropsType<T = {}> = {
  render?: (value: any, props: T, dom: React.ReactNode) => React.ReactNode;

  renderFormItem?: (
    value: any,
    props: T,
    dom: React.ReactNode
  ) => React.ReactNode;
};

export type FieldFC<
  T = {},
  RefType extends CommonRefField = any,
> = React.ForwardRefRenderFunction<
  RefType,
  T &
    BaseFieldFCProps &
    Omit<ControllerRenderProps<any, string>, 'ref'> &
    RenderFieldPropsType<T>
>;
