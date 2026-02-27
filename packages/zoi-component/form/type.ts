import type React from 'react';
import type { FieldValueType, RenderFieldPropsType } from '../field/type';

/**
 * FormConfigProps defines the configuration for a form component.
 * It includes properties for layout, label, tooltip, validation debounce,
 * name, and size.
 * * @interface FormConfigProps
// * @property {boolean} [colon=true] - Whether to display a colon after the label.
// * @property {'horizontal' | 'vertical'} [layout='horizontal'] - The layout of the form.
// * @property {string} [label] - The label for the form item.
// * @property {string} [tooltip] - Tooltip text for the form item.
// * @property {number} [validateDebounce=300] - Debounce time for validation in milliseconds.
// * @property {string | string[]} [name] - The name of the form item, can be a string or an array of strings.
// * @property {'middle' | 'small' | 'large'} [size='middle'] - The size of the form item.
 */
export type FormConfigProps = {
  /**
   * Default is `true`
   */
  colon?: boolean;

  /**
   * Default is `horizontal`
   */
  layout?: 'horizontal' | 'vertical';

  label?: string;

  tooltip?: React.ReactNode;

  validateDebounce?: number;

  name?: string | string[];

  /**
   * Default is `middle`
   * @type middle: size is 28px
   * @type small: size is 22px
   * @type large: size is 36px
   */
  size?: 'middle' | 'small' | 'large';
};

/**
 * FormModeType defines the mode of the form.
 * It can be 'edit', 'view', or 'update'.
 * @type {FormModeType}
 */
export type FormModeType = 'edit' | 'view' | 'update';

/**
 * WrapFormItemProps is used to wrap form item with additional elements like addons.
 */
export type WrapFormItemProps = {
  addonBefore?: React.ReactNode;

  /**
   * @type HTMLElement['className']
   */
  addonBeforeClassName?: HTMLElement['className'];

  addonAfter?: React.ReactNode;

  /**
   * @type HTMLElement['className']
   */
  addonAfterClassName?: HTMLElement['className'];

  addonWrapStyle?: React.CSSProperties;

  /**
   * @type HTMLElement['className']
   */
  addonWrapClassName?: HTMLElement['className'];

  rootClassName?: HTMLElement['className'];
  rootStyle?: React.CSSProperties;
};

export type FieldProps<TRef = any> = {
  style?: React.CSSProperties;
  width?: string | number;
  ref?: React.Ref<TRef>;

  /**
   * This property is used to customize the field names for value, label, and children in complex components like select or tree select.
   */
  fieldNames?: {
    label?: string;
    value?: string;
    options?: string;
    children?: string;
  };
};

export type FormItemProps = {
  /**
   * Default value is `text`.
   */
  valueType?: FieldValueType;
} & WrapFormItemProps;

export type GFormFieldItemProps<
  T = Record<string, any>,
  TRef = any,
> = FormItemProps &
  RenderFieldPropsType<T> & {
    /**
     *
     */
    fieldProps?: Partial<FieldProps<TRef> & T>;

    emptyText?: React.ReactNode;

    /**
     * The width of the form item.
     * It can be a number (in pixels) or a string representing a size.
     * @type xs=104px
     * @type sm=216px
     * @type md=328px
     * @type lg=440px
     * @type xl=552px
     */
    width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  };
