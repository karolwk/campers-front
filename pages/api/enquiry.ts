import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { sendEmail } from '../../utils/sendEmail';

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
      if (data.success) {
        if (data.score > 0.5) {
          try {
            await sendEmail({
              replyTo: req.body.email as string,
              to: process.env.EMAIL_TO as string,
              subject: 'Zapytanie ze stony',
              text: req.body.message as string,
              html: `<p><strong>Nadawca:</strong></p>${req.body.firstName}<p><strong>email i telefon:</strong>
              </p> ${req.body.email} ${req.body.phone}<p><strong>Treść:</strong></p><p>${req.body.message}</p> `,
            });
            res.status(200).json({
              status: 'success',
              message: 'CAPTCHA OK',
            });
          } catch (error) {
            res.status(550).json({
              status: 'failure',
              message:
                'Problem z wysyłką wiadomości - serwer pocztowy nie odpowiada',
            });
          }
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
