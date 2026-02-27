import { isBrowser } from '@/utils';
import { useEffect } from 'react';

export function useDocumentTitle(
  titleInfo: {
    title: string;
    id: string;
    pageName: string;
  },
  appDefaultTitle: string | false
) {
  const titleText =
    typeof titleInfo.title === 'string' ? titleInfo.title : appDefaultTitle;
  useEffect(() => {
    if (isBrowser() && titleText) {
      document.title = titleText;
    }
  }, [titleInfo.title, titleText]);
}
