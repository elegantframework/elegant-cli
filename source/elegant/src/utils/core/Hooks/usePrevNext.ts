import { useRouter } from 'next/router';
import { documentationNav } from '@/config/Navigation';

export function usePrevNext() {
  let router = useRouter();
  let pages = documentationNav.flatMap((section) => section.links);
  let pageIndex = pages.findIndex((page) => page.href === router.asPath);
  
  return {
    prev: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
    next: pageIndex > -1 ? pages[pageIndex + 1] : undefined,
  }
}
