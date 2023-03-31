import { importAll } from '@/utils/importAll'

export function createPageList(files: any, base: string) {
  return importAll(files).reduce((acc: any, cur: any) => {
    let slug = cur.fileName.substr(2).replace(/\.mdx$/, '')
    return {
      ...acc,
      [slug]: { ...cur.module.default, href: `/${base}/${slug}` },
    }
  }, {})
};