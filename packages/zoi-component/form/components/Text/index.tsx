import type { InputRef } from '@/common/field/ref.type';
import { InputProps } from '@/ui/input';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import FormField, { GFormFieldProps } from '../../Field';

export type FormTextProps = GFormFieldProps<InputProps, InputRef>;
const FormText: ForwardRefRenderFunction<InputRef, FormTextProps> = (
  { fieldProps, valueType = 'text', ...restProps },
  ref
) => {
  return (
    <FormField
      fieldProps={fieldProps}
      valueType={valueType}
      ref={ref}
      {...restProps}
    />
  );
};

FormText.displayName = 'FormText';

export default forwardRef(FormText);
