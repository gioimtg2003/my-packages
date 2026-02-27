import { isDeepEqualReact } from '@/utils';
import { memo, ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  useController,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface IControlledFormProps {
  control: Control<any, any>;
  label?: string;
  description?: string | ReactNode;
  name: string;
  optional?: boolean;
  containerClassName?: string;
  className?: string;
}
export interface IBaseFormProps extends IControlledFormProps {
  render: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
}

const BaseForm = (props: IBaseFormProps) => {
  const { control, label, description, name, optional, containerClassName } =
    props;
  // const formTrans = useFormTranslation();
  const controller = useController({ name, control });

  const error = controller.fieldState?.error?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={twMerge('w-full', containerClassName)}>
          {label && (
            <span className='flex items-center'>
              <span
                className={twMerge(
                  'mb-1 text-sm font-medium',
                  error ? 'text-red-500' : 'text-zinc-700'
                )}
              >
                {label}
              </span>
              {optional && (
                <span className='text-xs font-light text-gray-400'>
                  &nbsp;( Optional )
                </span>
              )}
            </span>
          )}
          {props.render(field)}
          {description && (
            <p className='truncate text-xs text-zinc-400'>{description}</p>
          )}
          {error && (
            <p className='mt-1 truncate text-xs text-red-500'>{error}</p>
          )}
        </div>
      )}
    />
  );
};

BaseForm.displayName = 'BaseForm';

export default memo(BaseForm, isDeepEqualReact);
