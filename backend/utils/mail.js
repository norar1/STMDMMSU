import { MailtrapClient } from "mailtrap";

const TOKEN = "920a06f6672916331cf60433d843bfa4";
const client = new MailtrapClient({ token: TOKEN });

const sender = { email: "hello@demomailtrap.com", name: "DMMMSU" };

export const sendVerificationCode = async (email, code) => {
  const subject = "Your Verification Code";
  const message = "Use the code below to verify your account:";

  const htmlTemplate = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqSGw6XnRB_PumhqaPsNx35euJ3A-esDeGA&s" alt="DMMMSU Logo" style="max-width: 150px; display: block; margin: 0 auto 20px;"/>
          <h2 style="text-align: center; color: #4CAF50;">${subject}</h2>
          <p style="text-align: center; font-size: 18px; line-height: 1.6; color: #555;">${message}</p>
          <h3 style="text-align: center; font-size: 24px; font-weight: bold; color: #4CAF50;">${code}</h3>
          <p style="text-align: center; font-size: 14px; color: #777;">If you didn’t request this, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;

  await client.send({ from: sender, to: [{ email }], subject, text: `${message} ${code}`, html: htmlTemplate });
};

export const sendResetPasswordCode = async (email, code) => {
  const subject = "Password Reset Code";
  const message = "Use the code below to reset your password:";

  const htmlTemplate = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqSGw6XnRB_PumhqaPsNx35euJ3A-esDeGA&s" alt="DMMMSU Logo" style="max-width: 150px; display: block; margin: 0 auto 20px;"/>
          <h2 style="text-align: center; color: #4CAF50;">${subject}</h2>
          <p style="text-align: center; font-size: 18px; line-height: 1.6; color: #555;">${message}</p>
          <h3 style="text-align: center; font-size: 24px; font-weight: bold; color: #4CAF50;">${code}</h3>
          <p style="text-align: center; font-size: 14px; color: #777;">If you didn’t request this, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;

  await client.send({ from: sender, to: [{ email }], subject, text: `${message} ${code}`, html: htmlTemplate });
};
