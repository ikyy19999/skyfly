"use server";

import { redirect } from "next/navigation";
import { formSchema } from "./validation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs'
import prisma from "../../../../../../lib/prisma";

export interface ActionResult {
	errorTitle: string | null;
	errorDesc: string[] | null;
}

// Define the structure of prevState (if necessary)
interface PrevState {
  user: {
    id: string;
    email: string;
  };
}

export async function handleSignIn(
	prevState: PrevState,  // Use a more specific type for prevState
	formData: FormData
): Promise<ActionResult> {
	const values = formSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!values.success) {
		const errorDesc = values.error.issues.map((issue) => issue.message);

		return {
			errorTitle: "Error Validation",
			errorDesc,
		};
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			email: values.data.email,
		},
	});

	if (!existingUser) {
		return {
			errorTitle: "Error",
			errorDesc: ["Email not found"],
		};
	}

	const validPassword = await bcrypt.compare(
		values.data.password,
		existingUser.password
	);

	if (!validPassword) {
		return {
			errorTitle: "Error",
			errorDesc: ["Incorrect email or password"],
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = await lucia.createSessionCookie(session.id);

	(await cookies()).set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return redirect("/dashboard");
}
