import { connect } from '@/db/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helper/mailer';
import axios from 'axios';

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password, recaptchaToken } = body;

        // Validate input fields
        if(!recaptchaToken) {
            return NextResponse.json({ error: 'reCAPTCHA validation failed' }, { status: 400 });
        }

        const res = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );
        const data = await res.data;

        if(data.success === false || data.score < 0.5) {
            return NextResponse.json({ error: 'reCAPTCHA validation failed' }, { status: 400 });
        }
        
        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Please fill all fields' }, { status: 400 });
        }

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 }); // Conflict status code
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Send verification email
        try {
            await sendEmail({ userId: user._id, email: user.email, reason: 'verify' });
        } catch (emailError) {
            // Log the email sending error and return a response with an appropriate status
            console.error("Error sending verification email:", emailError);
            return NextResponse.json({ error: 'Error sending verification email' }, { status: 500 });
        }

        // Successful user creation response
        return NextResponse.json(
            { message: 'User created successfully. Verification email sent.', success: true },
            { status: 201 }
        );
    } catch (error) {  // Type 'Error' instead of 'any'
        // Detailed error handling
        console.error("Error creating user:", error);
        
        if (error instanceof Error) {
            // If the error is an instance of Error, return the message
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Catch any other unexpected errors
        return NextResponse.json({ error: 'An unexpected error occurred during user creation' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Signup route' });
}
