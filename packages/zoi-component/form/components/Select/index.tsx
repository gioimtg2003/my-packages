import { SelectProps } from 'antd';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import FormField, { GFormFieldProps } from '../../Field';

export type FormSelectProps = GFormFieldProps<
  SelectProps & { optionsValueEnum?: Map<string, any> },
  {}
>;

const FormSelect: ForwardRefRenderFunction<{}, FormSelectProps> = (
  { fieldProps, valueType = 'select', ...restProps },
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

FormSelect.displayName = 'FormSelect';

export default forwardRef(FormSelect);
