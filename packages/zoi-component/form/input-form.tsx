import { Input, InputProps } from '@/ui/input';
import { isDeepEqualReact } from '@/utils';
import { memo } from 'react';
import BaseForm, { IControlledFormProps } from './base-form';

interface InputFormProps
  extends Omit<InputProps, 'name'>,
    IControlledFormProps {}

const InputForm = (props: InputFormProps) => {
  const { control, label, description, name, optional, ...rest } = props;

  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      optional={optional}
      render={(field) => <Input {...field} {...rest} />}
    />
  );
};

InputForm.displayName = 'InputForm';
export default memo(InputForm, isDeepEqualReact);
