import { NextRequest, NextResponse } from 'next/server';
import Config from '@/utils/Config/Config';
import { getLoginSession } from '@/utils/Auth/auth';

const REPO_SLUG = Config('admin.cms_repository_slug');
const REPO_BRANCH = Config('admin.cms_repository_branch');
const MONOREPO_PATH = Config('admin.cms_monorepo_path');

export default async function GET(
  req: NextRequest, 
  res: NextResponse
) {
  const REPO_OWNER = Config('admin.cms_repository_owner');

  const response = await fetch(
    `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_SLUG}/${REPO_BRANCH}/${
      MONOREPO_PATH ? MONOREPO_PATH + '/' : ''
    }public/images/${req.nextUrl.pathname.split('/').pop()}`
  )
  if (response.status === 200 && response.body) {
    const contentType = response.headers.get('Content-Type')
    const content =
      contentType === 'image/svg+xml'
        ? await response.blob()
        : Buffer.from(await response.arrayBuffer())

    const newHeaders = new Headers(req.headers)
    // Add a new header
    newHeaders.set('Cache-Control', 'max-age=300')

    return new Response(content, {
      status: 200,
      headers: { 'Cache-Control': 'max-age=300' }
    })
  }
  return new Response(response.statusText, {
    status: response.status
  })
}
