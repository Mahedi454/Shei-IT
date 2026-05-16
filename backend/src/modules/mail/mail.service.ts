import nodemailer from "nodemailer";

import { env } from "../../config/env";

type ContactEmailPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
};

const createTransporter = () => {
  if (!env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

export const sendContactEmail = async (payload: ContactEmailPayload) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn("SMTP credentials are missing. Contact email was not sent.");
    return;
  }

  const recipients = env.MAIL_TO.length ? env.MAIL_TO : env.ADMIN_EMAILS;

  if (!recipients.length) {
    console.warn("No MAIL_TO or ADMIN_EMAILS configured. Contact email was not sent.");
    return;
  }

  await transporter.sendMail({
    from: env.MAIL_FROM || env.SMTP_USER,
    to: recipients.join(","),
    replyTo: payload.email,
    subject: `New shei-it contact: ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company ?? "N/A"}`,
      `Phone: ${payload.phone ?? "N/A"}`,
      `Service: ${payload.service ?? "N/A"}`,
      `Budget: ${payload.budget ?? "N/A"}`,
      "",
      payload.message,
    ].join("\n"),
  });
};
