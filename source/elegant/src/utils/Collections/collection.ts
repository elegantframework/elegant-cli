import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Config from 'Config';

const CONTENT_PATH = join(
  process.cwd(),
  Config('admin.cms_content_path')
);

/**
 * Set our markdown document type to .mdx.
 */
const MD_MDX_REGEXP = /\.mdx?$/i;

/**
 * Get a collection of content documents.
 * @param collection 
 * @param fields 
 * @returns 
 */
export function getCollection(collection: string, fields: string[] = []) {
  const slugs = getDocumentSlugs(collection)
  const documents = slugs
    .map((slug) =>
      getDocumentBySlug(collection, slug, [...fields, 'publishedAt', 'status'])
    )
    .filter((document) => document.status === 'published')
    // sort documents by date in descending order
    .sort((document1, document2) =>
      document1.publishedAt > document2.publishedAt ? -1 : 1
    )
  return documents;
};

/**
 * 
 * @param collection 
 * @returns 
 */
export function getDocumentSlugs(collection: string) {
  const collectionsPath = join(CONTENT_PATH, collection)
  const mdMdxFiles = readMdMdxFiles(collectionsPath)
  const slugs = mdMdxFiles.map((file) => file.replace(MD_MDX_REGEXP, ''))
  return slugs
}

/**
 * 
 * @param collection 
 * @param slug 
 * @param fields 
 * @returns 
 */
export function getDocumentBySlug(
  collection: string,
  slug: string,
  fields: string[] = []
) {
  try {
    const realSlug = slug.replace(MD_MDX_REGEXP, '')
    const collectionsPath = join(CONTENT_PATH, collection)
    const fullPath = join(collectionsPath, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    type Items = {
      [key: string]: string
    }

    const items: Items = {}

    if (data['status'] === 'draft') {
      return {}
    }

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug
      }
      if (field === 'content') {
        items[field] = content
      }

      if (typeof data[field] !== 'undefined') {
        items[field] = data[field]
      }
    })

    return items;
  } 
  catch (error) {
    console.error({ getDocumentBySlug: error })
    return {}
  }
}

/**
 * Get all documents of a particular collection
 * @param collection The collection name to query.
 * @param fields The fields to include in the returned data.
 * @returns A list of documents.
 */
export function getDocuments(collection: string, fields: string[] = []) {
  const slugs = getDocumentSlugs(collection)
  const documents = slugs
    .map((slug) =>
      getDocumentBySlug(collection, slug, [...fields, 'publishedAt', 'status'])
    )
    .filter((document) => document.status === 'published')
    // sort documents by date in descending order
    .sort((document1, document2) =>
      document1.publishedAt > document2.publishedAt ? -1 : 1
    )
  return documents;
}

/**
 * Read a markdown mdx file.
 * @param path 
 * @returns 
 */
export function readMdMdxFiles(path: string) {
  try {
    const dirents = fs.readdirSync(path, { withFileTypes: true })
    const mdMdxFiles = dirents
      .filter((dirent) => dirent.isFile() && MD_MDX_REGEXP.test(dirent.name))
      .map((dirent) => dirent.name)
    return mdMdxFiles
  } catch (error) {
    console.error({ readMdMdxFiles: error })
    return []
  }
}
