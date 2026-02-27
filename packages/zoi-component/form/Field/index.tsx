import Field from '@/common/field';
import useDeepCompareMemo from '@/hooks/useDeepCompareMemo';
import { isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import { BaseFieldFCProps } from '../../field/type';
import FormItem from '../FormItem';
import type { FormConfigProps, GFormFieldItemProps } from '../type';

export type GFormFieldProps<
  FiledProps = Record<string, any>,
  TRef = any,
> = GFormFieldItemProps<FiledProps, TRef> & {
  //TODO: Improve ts
  ref?: React.Ref<any>;
} & Pick<BaseFieldFCProps, 'adapter' | 'autoFocus' | 'mode'> &
  FormConfigProps;

const BaseFormField: React.FC<GFormFieldProps> = (props) => {
  const {
    fieldProps,
    valueType,
    adapter = 'shadcn',
    autoFocus,
    render,
    renderFormItem,
    ref,
    ...restProps
  } = props;

  const commonFieldProps = useDeepCompareMemo(() => {
    return {
      fieldProps,
      autoFocus,
      ref,
      adapter,
    };
  }, [fieldProps, autoFocus, adapter, ref]);

  return (
    <FormItem {...restProps}>
      {({ field, fieldState, formState }) => {
        return (
          <Field
            {...field}
            {...fieldState}
            {...formState}
            {...commonFieldProps}
            id={field.name}
            valueType={valueType}
            render={render}
            renderFormItem={renderFormItem}
          />
        );
      }}
    </FormItem>
  );
};
BaseFormField.displayName = 'BaseFormField';

const FormField = memo(BaseFormField, isDeepEqualReact);

export default FormField;
