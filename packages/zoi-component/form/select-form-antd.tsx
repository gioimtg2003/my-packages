import { Select, SelectProps } from 'antd';
import BaseForm, { IControlledFormProps } from './base-form';

export interface IAntdSelectFormProps
  extends IControlledFormProps,
    SelectProps {}

export default function AntdSelectForm(props: IAntdSelectFormProps) {
  const {
    control,
    label,
    description,
    name,
    optional,
    containerClassName,
    ...rest
  } = props;
  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      optional={optional}
      containerClassName={containerClassName}
      render={(field) => (
        <Select onChange={field.onChange} value={field.value} {...rest} />
      )}
    />
  );
}
