import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const emailjs = require("@emailjs/nodejs");

export const sendPasswordResetEmail = async (emailData) => {
  try {
    const response = await emailjs.send(
      process.env.SERVICE_ID,
      process.env.PASSWORD_RESET_TEMPLATE_ID,
      {
        to_email: emailData.receiver,
        subject: "Password Reset",
        template_params: {
          user_email: emailData.receiver,
          message: `Click the following link to reset your password: ${emailData.link}`,
        },
      },
      {
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY,
      }
    );
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

