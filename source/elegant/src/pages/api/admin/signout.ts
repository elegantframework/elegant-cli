import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@/utils/Auth/auth-cookies';

export default async function logout(_: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}
