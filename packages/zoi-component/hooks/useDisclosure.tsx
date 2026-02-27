import { useState } from 'react';

export interface IDisclosureControls<T = any> {
  isOpen: boolean;
  open: (data?: T) => void;
  close: () => void;
  onChange: (open: boolean) => void;
  data: T | null | undefined;
}

interface IDisclosureProps {
  deleteDataAfterClose?: boolean;
}
export function useDisclosure<T = any>(
  props?: IDisclosureProps
): IDisclosureControls<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null | undefined>(undefined);

  const open = (data?: T) => {
    setIsOpen(true);
    setData(data);
  };
  const close = () => {
    setIsOpen(false);
    if (props?.deleteDataAfterClose) {
      setData(undefined);
    }
  };

  const onChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && props?.deleteDataAfterClose) {
      setData(undefined);
    }
  };

  return {
    isOpen,
    open,
    close,
    onChange,
    data,
  };
}
