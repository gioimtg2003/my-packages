import { genKey, objectToMap } from '@/utils';

// TODO: improve ts, refer: https://github.com/ant-design/pro-components/blob/master/src/utils/typing.ts#L479
export type FieldValueEnumMapType =
  | Map<string | number, React.ReactNode>
  | Record<string, React.ReactNode>;

export const fieldParsingValue = (
  value: string | number | (string | number)[],
  valueEnumParams: FieldValueEnumMapType,
  key?: string | number
) => {
  if (Array.isArray(value)) {
    return (
      <div
        key={key}
        className='inline-flex items-center justify-center gap-x-1'
      >
        {value?.map((val, idx) => {
          return fieldParsingValue(val, valueEnumParams, idx);
        })}
      </div>
    );
  }

  const valueEnumMap = objectToMap(valueEnumParams);

  if (!valueEnumMap.has(value) && !valueEnumMap.has(`${value}`)) {
    return value;
  }

  const dom = valueEnumMap.get(value) ?? valueEnumMap.get(`${value}`);

  return <span key={genKey(value, key ?? '')}>{dom}</span>;
};
