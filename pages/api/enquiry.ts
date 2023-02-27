import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Response = {
  status: 'success' | 'failure';
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === 'POST') {
    try {
      const secretToken = process.env.RECAPTCHA_KEY;
      const { data } = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        `secret=${secretToken}&response=${req.body.captchaToken}`
      );
      console.log(JSON.stringify(data));
      if (data.success) {
        if (data.score > 0.5) {
          res.status(200).json({
            status: 'success',
            message: 'CAPTCHA OK',
          });
        } else {
          res.status(200).json({
            status: 'failure',
            message: 'Bląd testu ReCaptcha',
          });
        }
      } else {
        res.status(200).json({
          status: 'failure',
          message: 'Błąd walidacji ReCaptcha',
        });
      }
    } catch (error) {
      res.status(405).json({
        status: 'failure',
        message: 'Error submitting the enquiry form',
      });
    }
  }
}
