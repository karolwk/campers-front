import nodemailer from 'nodemailer';

interface emailArguments {
  replyTo: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({
  replyTo,
  to,
  subject,
  text,
  html,
}: emailArguments) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kamperynawynajem.pl - Formularz na stronie" <strona@kamperynawynajem.pl>',
    replyTo,
    to,
    subject,
    text,
    html,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
