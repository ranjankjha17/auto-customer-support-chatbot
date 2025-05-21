import { NextResponse } from 'next/server'
import { lucia } from '@/lib/auth'
import { validatePassword } from '@/lib/auth-utils'
import { User } from '@/models/User'
import { connectToDatabase } from '@/lib/mongo/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const { db } = await connectToDatabase()

    // Find user by email
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Validate password
    const isValidPassword = await validatePassword(
      password,
      user.hashedPassword
    )
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session
    const session = await lucia.createSession(user._id.toString(), {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': sessionCookie.serialize(),
        },
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}