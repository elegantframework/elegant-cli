import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@/utils/Auth/auth';
import Config from '@/utils/Config/Config';

const REPO_SLUG = Config('admin.cms_repository_slug');
const REPO_BRANCH = Config('admin.cms_repository_branch');
const MONOREPO_PATH = Config('admin.cms_monorepo_path');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getLoginSession(req)

  const REPO_OWNER = Config('admin.cms_repository_owner')

  console.log(req.query?.slug)

  const response = await fetch(
    `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_SLUG}/${REPO_BRANCH}/${
      MONOREPO_PATH ? MONOREPO_PATH + '/' : ''
    }public/images/${req.query?.slug}`
  )
  if (response.status === 200 && response.body) {
    const buffer = Buffer.from(await response.arrayBuffer())
    res.setHeader('Content-Type', 'image/png')
    res.setHeader("Content-Disposition", "inline")
    res.setHeader('Cache-Control', 'max-age=300')
    res.status(200).send(buffer)
  }

  res.status(response.status).send(response.statusText);
}