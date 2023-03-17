import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import axios from 'axios';

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
  // Using NextCors to deal with CORS policy
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
  if (req.method !== 'POST') {
    return res.status(500).send('Bad method');
  }

  // Check for secret to confirm that this is a valid request
  if (req.body.token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  //console.log(req.body);
  try {
    // If there are to many pages to revalidate it is simpler to just rebuild

    if (req.body.data === 'rebuild') {
      await axios.post(process.env.REBUIL_WEBHOOK as string);
      return res.json({ message: 'Page rebuild', revalidated: true });
    }

    // revalidating request link
    await res.revalidate(req.body.data);

    // some edge cases to revalidate more pages
    if (req.body.data.search(/kampery/) >= 0) {
      await res.revalidate('/');
      await res.revalidate('/kampery');
    }

    if (req.body.data.search(/polityka-prywatnosci/) >= 0) {
      await res.revalidate('/kontakt');
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
