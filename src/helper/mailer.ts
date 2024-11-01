import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailType = {
  verify: {
    subject: "Welcome to our platform, please verify your email",
    text: "Please verify your email by clicking the following link: \n\n",
  },
  reset: {
    subject: "Password reset",
    text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n",
  },
};

type EmailReason = "verify" | "reset";

export const sandEmail = async ({
  userId,
  email,
  reson,
}: {
  userId: string;
  email: string;
  reson: EmailReason;
}) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User details not ment");
    }

    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (reson === "reset") {
      user.forgotPasswordToken = hasedToken;
      user.forgotPasswordExpire = Date.now() + 3600000;
    } else if (reson === "verify") {
      user.verifyToken = hasedToken;
      user.verifyExpire = Date.now() + 3600000;
    }
    await user.save();

    const { subject, text } = emailType[reson];

    const link = `<a href="${process.env.DOMAIN}/auth/${reson}?token=${hasedToken}">Click here</a> or copy and paste the following link in your browser: ${process.env.DOMAIN}/auth/${reson}?token=${hasedToken}`;

    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject: subject,
      html: text + link,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
