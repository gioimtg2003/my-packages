import { createContext } from 'react';
import { FormConfigProps } from '../type';

export const FormItemProvider = createContext<
  Pick<FormConfigProps, 'colon' | 'size' | 'layout'>
>({});
