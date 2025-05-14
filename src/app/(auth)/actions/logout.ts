"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/utils/authOptions";
import { db } from "@/config/db";
import { users } from "@/schema/user";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";

export async function logout() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: 'Not authenticated', success: false };
  }

  try {
    await db
      .update(users)
      .set({ refreshToken: null })
      .where(eq(users.id, parseInt(session.user.id)));

        // Note: signOut is client-side, so we redirect after clearing the token
        return { error: null, success: true };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Logout error:", {
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("Logout error:", { error });
        }
        return { error: "Failed to logout", success: false };
    }
}