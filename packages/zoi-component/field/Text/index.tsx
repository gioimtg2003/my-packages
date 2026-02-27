import { Input } from '@/ui/input';
import { InputTags } from '@/ui/input-tags';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { FieldFC } from '../type';

const FieldText: FieldFC<{}> = (props, ref) => {
  const { autoFocus, mode, render, renderFormItem, fieldProps, ...restProps } =
    props;

  const refInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => refInput?.current, []);

  useEffect(() => {
    if (autoFocus && refInput.current) {
      refInput.current.focus();
    }
  }, [autoFocus]);

  if (mode === 'view') {
    const dom = restProps?.value;

    if (render) {
      return <>{render(restProps?.value, { ...fieldProps }, dom)}</>;
    }

    return <>{dom}</>;
  }

  const dom =
    fieldProps?.mode === 'multiple' ? (
      <InputTags ref={refInput} {...fieldProps} {...restProps} />
    ) : (
      <Input ref={refInput} {...fieldProps} {...restProps} />
    );

  if (renderFormItem) {
    return <>{renderFormItem(restProps?.value, { ...fieldProps }, dom)}</>;
  }

  return dom;
};

FieldText.displayName = 'FieldText';
export default forwardRef(FieldText);
