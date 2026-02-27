import { Select } from '@/ui/select';
import { objectToMap } from '@/utils';
import { Select as SelectAntd } from 'antd';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { fieldParsingValue } from '../helper/fieldParsingValue';
import { FieldFC } from '../type';

export type SelectFieldProps = {};
const FieldSelect: FieldFC<{}> = (props, ref) => {
  const { mode, adapter, render, renderFormItem, fieldProps, ...restProps } =
    props;
  const {
    label: labelField = 'label',
    value: valueField = 'value',
    children: childrenField = 'children',
  } = fieldProps?.fieldNames ?? {};

  const refSelect = useRef<any>(null);

  useImperativeHandle(ref, () => refSelect?.current, []);

  const optionsValueEnum = useMemo(() => {
    if (mode !== 'view') return;

    const valuesMap = new Map();

    const traverseOpt = (opt: any) => {
      if (!opt?.length || !Array.isArray(opt)) return valuesMap;

      const length = opt?.length;
      let i = 0;

      while (i < length) {
        const cur = opt[i++];

        valuesMap.set(cur?.[valueField], cur?.[labelField]);

        // Recursive traverse children
        traverseOpt(cur?.[childrenField] || cur?.[valueField]);
      }

      return valuesMap;
    };

    return traverseOpt(fieldProps?.options);
  }, [fieldProps?.options, mode]);

  if (mode === 'view') {
    const dom = fieldParsingValue(
      restProps?.value || fieldProps?.value,
      objectToMap(optionsValueEnum)
    );

    if (render)
      return (
        <>
          {render(restProps?.value, { ...fieldProps, optionsValueEnum }, dom)}
        </>
      );

    return <>{dom}</>;
  }

  if (adapter === 'antd') {
    const dom = <SelectAntd ref={refSelect} {...restProps} {...fieldProps} />;

    if (renderFormItem) {
      return <>{renderFormItem(restProps?.value, { ...fieldProps }, dom)}</>;
    }
    return dom;
  }

  const dom = <Select {...restProps} />;

  if (renderFormItem) {
    return <>{renderFormItem(restProps?.value, { ...fieldProps }, dom)}</>;
  }
  return dom;
};
FieldSelect.displayName = 'FieldSelect';

export default forwardRef(FieldSelect);
