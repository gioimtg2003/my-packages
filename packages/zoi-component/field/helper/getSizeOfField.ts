import type { FormConfigProps } from '@/common/form/type';

export const getSizeOfField = (size: FormConfigProps['size']) => {
  switch (size) {
    case 'small':
      return 'g-input-sm';
    case 'middle':
      return 'g-input-md';
    case 'large':
      return 'g-input-lg';
    default:
      return size;
  }
};
