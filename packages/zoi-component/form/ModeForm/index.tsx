import { createContext } from 'react';
import type { FormModeType } from '../type';

export const ModeFormContext = createContext<{
  /**
   * The mode of the form, which can be 'edit', 'view', or 'update'.
   * @default 'edit'
   * @type {FormModeType}
   */
  mode: FormModeType;
}>({
  mode: 'edit',
});
