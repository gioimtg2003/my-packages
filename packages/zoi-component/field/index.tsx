import { useRefFunction } from '@/hooks';
import useDeepCompareMemo from '@/hooks/useDeepCompareMemo';
import { cn } from '@/lib/utils';
import { omitUndefined } from '@/utils';
import {
  forwardRef,
  Fragment,
  useContext,
  type ForwardRefRenderFunction,
} from 'react';
import { FormItemProvider } from '../form/FormItem/FormItemProvider';
import { ModeFormContext } from '../form/ModeForm';
import type { FormModeType } from '../form/type';
import { getSizeOfField } from './helper/getSizeOfField';
import type { CommonRefField } from './ref.type';
import FieldSelect from './Select';
import './style.css';
import FieldText from './Text';

import { omit } from 'lodash';
import type {
  FieldFCRenderProps,
  FieldPropsType,
  FieldValueType,
} from './type';

const IGNORE_FIELD_PROPS = [
  'onChange',
  'invalid',
  'isTouched',
  'isDirty',
  'isValidating',
  'error',
  'defaultValues',
];

type RenderFieldProps = Pick<FieldPropsType, 'emptyText'> &
  FieldFCRenderProps & {
    [key: string]: any;
  };
const renderField = (
  value: any,
  valueType: FieldValueType,
  mode: FormModeType,
  props: RenderFieldProps,
) => {
  const { emptyText } = props;
  if (
    !(typeof emptyText === 'undefined' || emptyText === null) &&
    mode === 'view' &&
    !value
  )
    return emptyText;

  const commonProps = {
    ...props,
    value,
    mode,
  };

  if (valueType === 'text') {
    return <FieldText {...commonProps} />;
  }

  if (valueType === 'select') {
    return <FieldSelect {...commonProps} />;
  }

  return null;
};

/**
 * This component render all field.
 */
const Field: ForwardRefRenderFunction<CommonRefField, FieldPropsType> = (
  props,
  ref,
) => {
  const {
    valueType = 'text',
    value,
    fieldProps: restFieldProps,
    ...rest
  } = props ?? {};

  const { mode } = useContext(ModeFormContext);
  const { size } = useContext(FormItemProvider);

  const onChangeCallBack = useRefFunction((...restParams: any[]) => {
    restFieldProps?.onChange?.(...restParams);
    rest?.onChange?.(...restParams);
  });

  const fieldProps = useDeepCompareMemo(() => {
    return {
      ...omitUndefined(restFieldProps ?? {}),
      className: cn(restFieldProps?.className, getSizeOfField(size)),
      onChange: onChangeCallBack,
    };
  }, [restFieldProps, onChangeCallBack]);

  const renderDom = renderField(
    restFieldProps?.value || value,
    valueType,
    mode,
    {
      ...(omit(rest, IGNORE_FIELD_PROPS) as RenderFieldProps),
      fieldProps,
      adapter: restFieldProps?.adapter || rest?.adapter,
      ref,
      value,
    },
  );

  return <Fragment>{renderDom}</Fragment>;
};
export default forwardRef(Field);
