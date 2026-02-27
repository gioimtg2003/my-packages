import { cn } from '@/lib/utils';
import { useContext, useImperativeHandle } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { GFormProviderConfigContext } from '../BaseForm/GFormProviderConfig';
import { FormListProps } from './type';

export default function FormList<Schema>(props: FormListProps<Schema>) {
  const {
    name: formName,
    // deleteIcon = { icon: <Trash />, tooltip: 'Delete this item' },
    // addIcon = { icon: <Plus />, tooltip: 'Add new item' },
    creatorRecord,
    className,
    containerStyle,
    // initialValue,
    children,
    max,
    onAfterRemove,
    onAfterAdd,
    emptyList = 'No data',
    actionRef,
  } = props ?? {};

  // const actionRefs = useRef<FormListActionType<Schema>>(undefined);
  const { getPrefixCls } = useContext(GFormProviderConfigContext);
  const { control } = useFormContext();

  const prefixCls = getPrefixCls?.('form-list');

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
    move: moveResource,
  } = useFieldArray({
    control: control,
    name: formName as keyof Schema & string,
  });

  const count = resourceFields?.length || 0;

  useImperativeHandle(actionRef, () => ({
    get: (index: number) => {
      return resourceFields[index] as Schema;
    },
    getList() {
      return resourceFields as Schema[];
    },
    add: (defaultValue?: any, insertIndex?: number) => {
      if (max && count >= max) return;

      appendResource(
        typeof creatorRecord === 'function'
          ? creatorRecord()
          : (creatorRecord ?? defaultValue)
      );
      onAfterAdd?.(defaultValue, insertIndex ?? count);
    },
    remove: (index: number | number[]) => {
      removeResource(index);
      onAfterRemove?.(index, Array.isArray(index) ? index[0] : index);
    },
    move: (from: number, to: number) => {
      moveResource(from, to);
    },
  }));

  return (
    <div className={cn(prefixCls, className)} style={containerStyle}>
      {count === 0
        ? emptyList
        : children(
            resourceFields?.map((field, index) => ({
              value: field as unknown as Schema,
              key: field.id as unknown as number,
              id: field.id,
              idx: index,
            })),
            {
              add: (defaultValue) => {
                if (max && resourceFields.length >= max) return;

                appendResource(
                  typeof creatorRecord === 'function'
                    ? creatorRecord()
                    : (creatorRecord ?? defaultValue)
                );
                onAfterAdd?.(defaultValue, resourceFields.length);
              },
              remove: (index: number | number[]) => {
                removeResource(index);
                onAfterRemove?.(index, Array.isArray(index) ? index[0] : index);
              },
              move: (from: number, to: number) => {
                moveResource(from, to);
              },
            }
          )}
    </div>
  );
}
