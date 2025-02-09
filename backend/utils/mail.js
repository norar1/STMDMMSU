import { MailtrapClient } from "mailtrap";

const TOKEN = "0ce77a27db8b48cd9cb7facf2c15792b";

const client = new MailtrapClient({ token: TOKEN });

const sender = {
  email: "hello@demomailtrap.com",
  name: "Admin Verification",
};


export const sendVerificationCode = async (email, code) => {
  const htmlTemplate = `
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Verification Code</h2>
        <p>Your verification code is: <strong style="font-size: 24px;">${code}</strong></p>
        <p>Use this code to verify your account.</p>
      </body>
    </html>
  `;

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification code");
  }
};


export const sendResetCode = async (email, code) => {
  const htmlTemplate = `
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Password Reset Code</h2>
        <p>Your reset code is: <strong style="font-size: 24px;">${code}</strong></p>
        <p>Use this code to reset your password.</p>
      </body>
    </html>
  `;

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      subject: "Your Password Reset Code",
      text: `Your reset code is: ${code}`,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Failed to send reset code");
  }
};
