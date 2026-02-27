import { defaultPrefixCls } from '@/constants';
import { cn } from '@/lib/utils';
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import {
  FieldPath,
  FormProvider,
  useForm,
  UseFormReturn,
  type DefaultValues,
  type FieldValues,
  type Mode,
  type Resolver,
} from 'react-hook-form';
import type { FormConfigProps, FormModeType } from '../type';
import { GFormProviderConfigContext } from './GFormProviderConfig';

export interface BaseFormProps<Schema extends FieldValues> {
  resolver: Resolver<Schema>;
  defaultValues?: DefaultValues<Schema>;
  values?: Schema;

  onSubmit?: (data: Schema) => void;
  modeValidate?: Mode;
  layout?: FormConfigProps['layout'];

  mode?: FormModeType;

  children?:
    | ((props: {
        methods: UseFormReturn<Schema, any, Schema>;
      }) => React.ReactNode)
    | React.ReactNode;
}

export type BaseGFormRef<T extends FieldValues> = {
  reset: (values?: T) => void;

  getValues: () => T;

  getValue: (field: FieldPath<T>) => T[keyof T];

  setValues: (values: Partial<T>) => void;
};

function Form<Schema extends FieldValues = {}>(
  props: BaseFormProps<Schema>,
  ref: React.Ref<BaseGFormRef<Schema>>
) {
  const {
    resolver,
    defaultValues,
    onSubmit,
    modeValidate = 'onSubmit',
    children,
    layout = 'horizontal',
    mode,
    values,
  } = props;
  const methods = useForm<Schema>({
    resolver,
    defaultValues,
    values,
    mode: modeValidate,
  });

  useImperativeHandle(
    ref,
    () => ({
      reset: (values) => {
        methods.reset(values);
      },
      getValues: () => methods.getValues(),

      getValue: (field) => methods.getValues(field),

      setValues: (values: Partial<Schema>) => {
        methods.reset({
          ...methods.getValues(),
          ...values,
        });
      },
    }),
    []
  );

  const classNames = useMemo(
    () =>
      cn(defaultPrefixCls, {
        'form-horizontal': layout === 'horizontal',
        'form-vertical': layout === 'vertical',
      }),
    [layout]
  );

  return (
    <GFormProviderConfigContext.Provider
      value={{ layout, mode: mode || 'edit' }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods?.handleSubmit(onSubmit ?? (() => {}))}
          className={classNames}
        >
          {typeof children === 'function' ? children({ methods }) : children}
        </form>
      </FormProvider>
    </GFormProviderConfigContext.Provider>
  );
}

Form.displayName = 'BaseForm';
export default forwardRef(Form) as <Schema extends FieldValues = {}>(
  props: BaseFormProps<Schema> & {
    ref?: React.Ref<BaseGFormRef<Schema>>;
  }
) => React.ReactElement;
