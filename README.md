# Next.js Auth Starter

🚀 **Next.js Auth Starter** – A full-stack authentication template built with Next.js, MongoDB, and Nodemailer. This project provides a secure authentication system with password reset, email verification, and session management.

## Features

- 🔐 **User Authentication** – Login, logout, and session handling.
- 📧 **Email Verification** – Send verification emails using Nodemailer.
- 🔄 **Password Reset** – Secure one-time token-based password reset.
- 🛠 **MongoDB with Dynamic Methods** – Efficient database operations.
- 📜 **API Routes** – Organized authentication endpoints.
- ✉ **Pre-configured Email Templates** – For account verification and password resets.

## Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/nextjs-auth-starter.git

# Navigate to the project folder
cd nextjs-auth-starter

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env with your MongoDB URI, SMTP details, and JWT secret

# Start the development server
npm run dev
```

## Project Structure

```
src/
  ├── app/
  ├── api/
  │   ├── users/
  │   ├── auth/
  │   ├── reset/
  │   ├── verify/
  ├── components/
  ├── fonts/
  ├── login/
  ├── profile/
  ├── signup/
  ├── globals.css
```

## Sample Email Templates
- check `src/helper/template`

## Tech Stack
- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB, Mongoose
- **Email Service**: Nodemailer
- **Auth**: JWT-based authentication

## Contribution
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
MIT License

