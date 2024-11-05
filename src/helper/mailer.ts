import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { getEmailVerificationTemplate, getPasswordResetTemplate } from "./template/sample";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailType = {
  verify: getEmailVerificationTemplate,
  reset: getPasswordResetTemplate
};

type EmailReason = "verify" | "reset";

export const sendEmail = async ({
  userId,
  email,
  reason,
}: {
  userId: string;
  email: string;
  reason: EmailReason;
}) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User details not ment");
    }

    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (reason === "reset") {
      user.forgotPasswordToken = hasedToken;
      user.forgotPasswordExpire = Date.now() + 3600000;
    } else if (reason === "verify") {
      user.verifyToken = hasedToken;
      user.verifyExpire = Date.now() + 3600000;
    }
    await user.save();

    const link = `${process.env.DOMAIN}/auth/${reason}?token=${hasedToken}`

    const { subject, html } = emailType[reason](link);

    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject: subject,
      html: html,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
