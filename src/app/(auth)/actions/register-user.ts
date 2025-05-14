"use server";;
import { db } from '@/config/db';
import { users } from '@/schema/user';
import { eq } from 'drizzle-orm';
import bcrypt from "bcryptjs";

export type ValidationErrorDetails = {
    property: string;
    constraints: Record<string, string>;
};

export type RegisterActionState = {
    error: string | null;
    success: boolean;
    details?: ValidationErrorDetails[];
};

export async function registerUser(
    prevState: RegisterActionState | undefined,
    formData: FormData
): Promise<RegisterActionState> {
    try {
        const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const role = formData.get('role') as string;

    if (!email || !password || !name || !role) {
      return { error: 'All required fields must be provided', success: false };
    }

    if (role !== 'general_user') {
      return { error: 'Invalid role', success: false };
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return { error: 'Email already exists', success: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      role,
      phone: phone || null,
    });

        return { error: null, success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Failed to register user", success: false };
    }
}