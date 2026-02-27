import type { FieldValueType } from '@/common/field/type';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import { cn } from '@/lib/utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  useContext,
  useMemo,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import {
  Controller,
  useController,
  useFormContext,
  type ControllerFieldState,
  type ControllerRenderProps,
  type UseFormStateReturn,
} from 'react-hook-form';
import { GFormProviderConfigContext } from '../BaseForm/GFormProviderConfig';
import { ModeFormContext } from '../ModeForm';
import type { FormConfigProps, FormModeType, WrapFormItemProps } from '../type';
import { FormItemProvider } from './FormItemProvider';
import './style.css';

export interface FormItemProps extends FormConfigProps, WrapFormItemProps {
  children: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<any, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  }) => React.ReactElement;
  mode?: FormModeType;

  /**
   * @default text
   */
  valueType?: FieldValueType;
}

const WrapperFormField: React.FC<PropsWithChildren<WrapFormItemProps>> = (
  props
) => {
  const {
    children,
    addonAfter,
    addonBefore,
    addonWrapStyle,
    addonWrapClassName,
    addonAfterClassName,
    addonBeforeClassName,
  } = props;

  if (!addonAfter && !addonBefore) {
    return <>{children}</>;
  }

  return (
    <div className={addonWrapClassName} style={addonWrapStyle}>
      {addonBefore && (
        <span style={{ marginInlineEnd: 8 }} className={addonBeforeClassName}>
          {addonBefore}
        </span>
      )}
      {children}
      {addonAfter && (
        <span style={{ marginInlineStart: 8 }} className={addonAfterClassName}>
          {addonAfter}
        </span>
      )}
    </div>
  );
};

const LayoutFormItem: React.FC<
  PropsWithChildren<
    {
      label?: FormConfigProps['label'];
      required?: boolean;
      name: string;
      tooltip?: ReactNode;
    } & Pick<WrapFormItemProps, 'rootClassName' | 'rootStyle'>
  >
> = ({ children, label, tooltip, name, rootClassName, rootStyle }) => {
  const { layout, colon } = useContext(FormItemProvider);
  const { layout: layoutForm } = useContext(GFormProviderConfigContext);

  const className = useMemo(() => {
    return cn(
      'g-form-item',
      {
        'form-item-horizontal':
          layout === 'horizontal' && layoutForm !== 'vertical',
        'form-item-vertical':
          layout === 'vertical' || layoutForm === 'vertical',
      },
      rootClassName
    );
  }, [layout, layoutForm, rootClassName, rootStyle]);

  const domLabel = useMemo(
    () =>
      label ? (
        <div className={cn('g-form-item-label')}>
          {/* // TODO: add required */}
          <label htmlFor={name} attribute-colon={colon && 'true'}>
            {/* TODO: improve render question icon */}
            {label} {tooltip ? <QuestionCircleOutlined /> : null}
          </label>
        </div>
      ) : null,
    [label, name, colon]
  );

  if (tooltip)
    return (
      <div className={className} style={rootStyle}>
        {domLabel && (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>{domLabel}</TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {children}
      </div>
    );

  return (
    <div className={className} style={rootStyle}>
      {domLabel}
      {children}
    </div>
  );
};

export default function FormItem(props: FormItemProps) {
  const {
    name: nameProp,
    label,
    tooltip,
    children,
    mode,
    rootClassName,
    rootStyle,
  } = props;
  const propsWrapperFormItem = useMemo(() => {
    const {
      addonAfter,
      addonBefore,
      addonWrapStyle,
      addonWrapClassName,
      addonAfterClassName,
      addonBeforeClassName,
    } = props;

    return {
      addonAfter,
      addonBefore,
      addonWrapStyle,
      addonWrapClassName,
      addonAfterClassName,
      addonBeforeClassName,
    };
  }, [
    props?.addonAfter,
    props.addonBefore,
    props.addonWrapStyle,
    props.addonWrapClassName,
    props.addonAfterClassName,
    props.addonBeforeClassName,
  ]);

  /**
   * name is required for react-hook-form to register the field.
   * It can be a string or an array of strings.
   * If it's an array, it will be joined with an underscore.
   */
  const name = useMemo(() => {
    let name = nameProp;
    if (Array.isArray(name)) name = name?.join('_');

    if (typeof name === 'string') {
      name = name?.trim();
    }
    if (!name) {
      console.warn('FormItem: name is required');
      return '';
    }
    return name;
  }, [nameProp]);

  const { control } = useFormContext();
  const context = useContext(GFormProviderConfigContext);

  const controller = useController({ name, control });
  const error = controller.fieldState?.error?.message;

  return (
    <FormItemProvider.Provider
      value={{
        layout: 'horizontal', // default layout
        colon: true, // default colon
        size: 'middle', // default size
        ...props,
      }}
      key={name}
    >
      <ModeFormContext.Provider value={{ mode: mode || context?.mode || 'edit' }}>
        <Controller
          name={name}
          control={control}
          render={(props) => {
            return (
              <LayoutFormItem
                name={name}
                label={label}
                tooltip={tooltip}
                rootClassName={rootClassName}
                rootStyle={rootStyle}
              >
                <WrapperFormField {...propsWrapperFormItem}>
                  <div className='form-item-control flex-auto max-w-full'>
                    {children(props)}
                    {error && (
                      <p className='mt-1 truncate text-xs text-red-500'>
                        {error}
                      </p>
                    )}
                  </div>
                </WrapperFormField>
              </LayoutFormItem>
            );
          }}
        />
      </ModeFormContext.Provider>
    </FormItemProvider.Provider>
  );
}
