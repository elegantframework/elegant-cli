import { NextApiRequest, NextApiResponse } from 'next';
import Config from 'Config';
import { getLoginSession } from '@/utils/Auth/auth';

const REPO_SLUG = Config('admin.cms_repository_slug');
const REPO_BRANCH = Config('admin.cms_repository_branch');
const MONOREPO_PATH = Config('admin.cms_monorepo_path');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getLoginSession(req);

  if (session?.access_token) {
    const REPO_OWNER = Config('admin.cms_repository_owner');

    const response = await fetch(
      `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_SLUG}/${REPO_BRANCH}/${
        MONOREPO_PATH ? MONOREPO_PATH + '/' : ''
      }public/images/${req.query?.slug}`,
      {
        headers: {
          authorization: `token ${session.access_token}`
        }
      }
    );
    
    if (response.status === 200 && response.body) {
      const contentType = response.headers.get('Content-Type');
      const buffer = (
          contentType === 'image/svg+xml'
          ? await response.blob()
          : Buffer.from(await response.arrayBuffer())
      );
      res.setHeader('Content-Type', contentType || "");
      res.setHeader("Content-Disposition", "inline");
      res.setHeader('Cache-Control', 'max-age=300');
      
      return res.status(200).send(buffer);
    }
    
    return res.status(response.status).send(response.statusText);
  }
  else{
    // the user is not logged in
    return new Response(
      'Unauthorized', { status: 401 }
    );
  }
}