import type { NextApiRequest, NextApiResponse } from 'next';
type Data =
  | {
      message?: string;
      revalidated?: boolean;
    }
  | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(500).send('Bad method');
  }

  // Check for secret to confirm this is a valid request
  if (req.body.token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.log(req.body);
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/kontakt');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
