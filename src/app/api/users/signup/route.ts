import { connect } from '@/db/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sandEmail } from '@/helper/mailer';

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Please fill all fields' }, { status: 400 });
        }

        // Check if user already exists
        const userExists = await User.findOne({$or: [{ email }, { username }]});
        if (userExists) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        sandEmail({ userId: user._id, email: user.email, reson: 'verify' });
        
        return NextResponse.json({ message: "User created successfully and verifymail sent to respective email", success: true }, { status: 201 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Signup route" });
}