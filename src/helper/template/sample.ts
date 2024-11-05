export function getEmailVerificationTemplate(verificationLink: string) {
  return {
    subject: "Verify Your Email Address",
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        color: #333333;
                    }
                    .content {
                        font-size: 16px;
                        color: #555555;
                        line-height: 1.6;
                    }
                    .verify-button {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 24px;
                        background-color: #4CAF50;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 30px;
                        font-size: 12px;
                        color: #777777;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 class="header">Email Verification</h2>
                    <p class="content">Hello,</p>
                    <p class="content">
                        Thank you for signing up. Please verify your email address by clicking the button below:
                    </p>
                    <p class="content" style="text-align: center;">
                        <a href="${verificationLink}" class="verify-button">Verify Email</a>
                    </p>
                    <p class="content" style="text-align: center;">
                        or copy and paste the following link in your browser
                        </br>
                         ${verificationLink}
                    </p>
                    <p class="content">
                        If you did not request this, please ignore this email.
                    </p>
                    <div class="footer">
                        &copy; 2024 Your devRoushan.tech. All rights reserved.
                    </div>
                </div>
            </body>
            </html>
        `,
  };
}

export function getPasswordResetTemplate(resetLink: string) {
  return {
    subject: "Password Reset",
    text: `
            You are receiving this because you (or someone else) have requested the reset of the password for your account.
            Please click on the following link, or paste this into your browser to complete the process:
            ${resetLink}

            If you did not request this, please ignore this email and your password will remain unchanged.
        `,
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        color: #333333;
                    }
                    .content {
                        font-size: 16px;
                        color: #555555;
                        line-height: 1.6;
                    }
                    .reset-button {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 24px;
                        background-color: #ff6b6b;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 30px;
                        font-size: 12px;
                        color: #777777;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 class="header">Password Reset</h2>
                    <p class="content">
                        You are receiving this because you (or someone else) have requested the reset of the password for your account.
                    </p>
                    <p class="content">
                        Please click on the button below, or copy and paste the following link into your browser to complete the process:
                    </p>
                    <p class="content" style="text-align: center;">
                        <a href="${resetLink}" class="reset-button">Reset Password</a>
                    </p>
                    <p class="content" style="text-align: center;">
                        <a href="${resetLink}">${resetLink}</a>
                    </p>
                    <p class="content">
                        If you did not request this, please ignore this email, and your password will remain unchanged.
                    </p>
                    <div class="footer">
                        &copy; 2024 Your Company Name. All rights reserved.
                    </div>
                </div>
            </body>
            </html>
        `,
  };
}
