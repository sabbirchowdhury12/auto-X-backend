import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function sendMail(recipient: string) {
  const transport = nodemailer.createTransport({
    service: 'gmail',

    host: 'smtp.gmail.com',
    port: 465,

    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: `${process.env.USER_EMAIL}`,
    to: `${recipient}`,
    subject: `Message from  (${process.env.USER_EMAIL})`,
    html: `
<html>
<head><title></title></head>
<body>
<h1>Welcome to Autox</h1>
</body>

</html>
    
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return 'Email sent Successfully';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err?.message;
  }
}
