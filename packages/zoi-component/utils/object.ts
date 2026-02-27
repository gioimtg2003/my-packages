import { FieldValueEnumMapType } from '@/components/common/field/helper/fieldParsingValue';

export const getObjectType = (obj: any): string => {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();

  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
};

/**
 * Convert all value to object Map
 */
export const objectToMap = (value?: FieldValueEnumMapType) => {
  if (getObjectType(value) === 'map') {
    return value as Map<string | number, React.ReactNode>;
  }

  return new Map(Object.entries(value || {})) as Map<
    string | number,
    React.ReactNode
  >;
};
