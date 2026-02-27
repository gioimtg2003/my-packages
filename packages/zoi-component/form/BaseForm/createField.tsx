import type { GFormFieldItemProps } from '../type';

export const createField =
  <T extends GFormFieldItemProps>() =>
  (Field: React.ComponentType<React.PropsWithChildren<T>>) => {
    const WrappedField: React.FC<React.PropsWithChildren<T>> = (props) => {
      return <Field {...props} />;
    };

    WrappedField.displayName = `WrappedField(${Field.displayName || Field.name})`;
    return WrappedField;
  };
