import { Checkbox } from '@/ui/checkbox';
import { isDeepEqualReact } from '@/utils';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { memo } from 'react';
import BaseForm, { IControlledFormProps } from './base-form';

export interface CheckboxFormProps
  extends IControlledFormProps,
    Omit<CheckboxProps, 'name'> {}

const CheckboxForm = (props: CheckboxFormProps) => {
  const { control, label, description, name, optional, ...rest } = props;

  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      optional={optional}
      render={(field) => <Checkbox {...field} {...rest} />}
    />
  );
};
CheckboxForm.displayName = 'CheckboxForm';
export default memo(CheckboxForm, isDeepEqualReact);
