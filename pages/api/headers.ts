import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/db/firebaseAdmin';
import { PageDataState } from '../../shared/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PageDataState>
) {
  try {
    const doc = await db
      .collection('settings')
      .doc('4qep1ITrkPDrxDRnaeYy')
      .get();

    if (!doc.exists) {
      res.status(404).end();
    } else {
      res.status(200).json(doc.data() as PageDataState);
    }
  } catch (error) {
    res.status(400).end();
  }
}
