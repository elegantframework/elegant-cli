import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@/utils/Auth/auth';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req)
    res.status(200).json({ session })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
