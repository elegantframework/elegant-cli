import showdown from 'showdown';
import DOMPurify from 'dompurify';
import { Document } from '@/types/Document';
import { replaceImageSrcRoot } from './replaceImageSrc';
import Config from './Config/Config';

export const mergeMdMeta = (data: Document): string => {
  const meta = Object.entries(
    (({ content, publishedAt, ...meta }) => meta)(data)
  )

  if (data.publishedAt) {
    meta.push(['publishedAt', data.publishedAt.toISOString()])
  }

  let merged = '---\n'

  Object.entries(meta).forEach(([_, value]) => {
    if (Array.isArray(value[1])) {
      merged += `${value[0]}: ${JSON.stringify(value[1])}\n`
    } else if (value[1] instanceof Object) {
      merged += `${value[0]}:\n`
      Object.entries(value[1]).forEach(([key, value]) => {
        merged += `  ${key}: '${DOMPurify.sanitize(value as string).replaceAll(
          "'",
          "''"
        )}'\n`
      })
    } else {
      merged += `${value[0]}: '${DOMPurify.sanitize(value[1]).replaceAll(
        "'",
        "''"
      )}'\n`
    }
  })

  merged += '---\n\n'

  const converter = new showdown.Converter()

  // replace /api/admin/images/ references
  let newContent = replaceImageSrcRoot(
    data.content,
    '/api/admin/images/',
    `/${Config('admin.cms_asset_path')}`
  )

  const imgFolderRegex = new RegExp(/(^\/api\/admin\/images\/)/gi)
  newContent = replaceImageSrcRoot(
    newContent,
    imgFolderRegex,
    `/${Config('admin.cms_asset_path')}`
  )

  // remove weird <p> tags
  newContent.replaceAll('<p><br></p>', '').replaceAll('<br></p>', '</p>')

  const markdown = converter.makeMarkdown(newContent)

  // replace leftover html comment with empty line
  const cleanMarkdown = markdown
    .replaceAll('\n\n\n<!-- -->\n\n', '\n\n')
    .replaceAll('](<', '](')
    .replaceAll('>)', ')')

  merged += cleanMarkdown
  return merged
}
