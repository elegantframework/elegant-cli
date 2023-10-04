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

  const REPO_OWNER = process.env.OST_REPO_OWNER || session?.user?.login

  if (session?.access_token) {
    const response = await fetch(
      `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_SLUG}/${REPO_BRANCH}/${
        MONOREPO_PATH ? MONOREPO_PATH + '/' : ''
      }public/images/${req.query?.ost?.[1]}`,
      {
        headers: {
          authorization: `token ${session.access_token}`
        }
      }
    )
    if (response.status === 200 && response.body) {
      const buffer = Buffer.from(await response.arrayBuffer())
      res.setHeader('Cache-Control', 'max-age=300')
      res.status(200).send(buffer)
      return;
    }

    res.status(response.status).send(response.statusText);
  } 
  else {
    res.status(401);
    res.end();
  }
}