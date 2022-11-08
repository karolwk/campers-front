import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/db/firebase';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const entries = await db.collection('settings').get();
    const entriesData = entries.docs.map((entry) => entry.data());

    res.status(200).json(entries);
  } catch (error) {
    res.status(400).end();
  }
}
