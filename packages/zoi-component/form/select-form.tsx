import { FormControl } from '@/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { genKey, isDeepEqualReact } from '@/utils';
import { memo, ReactNode } from 'react';
import BaseForm, { IControlledFormProps } from './base-form';

interface ISelectFormProps extends IControlledFormProps {
  options?: {
    label: ReactNode;
    value: string;
  }[];
  placeholder?: string;
}

const SelectForm = (props: ISelectFormProps) => {
  const {
    control,
    label,
    description,
    name,
    optional,
    options,
    placeholder,
    className,
  } = props;

  return (
    <BaseForm
      {...props}
      control={control}
      name={name}
      label={label}
      description={description}
      optional={optional}
      render={(field) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className='pointer-events-auto'>
            {options?.map((option) => (
              <SelectItem
                key={genKey('select-option', option.value)}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

SelectForm.displayName = 'SelectForm';
export default memo(SelectForm, isDeepEqualReact);
