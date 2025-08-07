"use server";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { redirect } from "next/navigation";
import { formFlightSchema } from "./validation";
import prisma from "../../../../../../lib/prisma";
import { generateSeatPerClass } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function saveFlight(
	prevState: unknown,
	formData: FormData
): Promise<ActionResult> {
	const departureDate = new Date(formData.get("departureDate") as string);
	const arrivalDate = new Date(formData.get("arrivalDate") as string);

	const validate = formFlightSchema.safeParse({
		planeId: formData.get("planeId"),
		price: formData.get("price"),
		departureCity: formData.get("departureCity"),
		departureDate,
		departureCityCode: formData.get("departureCityCode"),
		destinationCity: formData.get("destinationCity"),
		destinationCityCode: formData.get("destinationCityCode"),
		arrivalDate,
	});

	if (!validate.success) {
		const errorDesc = validate.error.issues.map((issue) => issue.message);

		return {
			errorTitle: "Error Validation",
			errorDesc,
		};
	}

	const flight = await prisma.flight.create({
		data: {
			...validate.data,
			price: Number.parseInt(validate.data.price),
		},
	});

	const seats = generateSeatPerClass(flight.id);

	await prisma.flightSeat.createMany({
		data: seats,
	});

	revalidatePath("/dashboard/flights");
	redirect("/dashboard/flights");
}

export async function updateFlight(
	prevState: unknown,
	id: string | null,
	formData: FormData
): Promise<ActionResult> {
	if (!id) {
		return {
			errorTitle: "Params ID missing",
			errorDesc: [],
		};
	}

	const departureDate = new Date(formData.get("departureDate") as string);
	const arrivalDate = new Date(formData.get("arrivalDate") as string);

	const validate = formFlightSchema.safeParse({
		planeId: formData.get("planeId"),
		price: formData.get("price"),
		departureCity: formData.get("departureCity"),
		departureDate,
		departureCityCode: formData.get("departureCityCode"),
		destinationCity: formData.get("destinationCity"),
		destinationCityCode: formData.get("destinationCityCode"),
		arrivalDate,
	});

	if (!validate.success) {
		const errorDesc = validate.error.issues.map((issue) => issue.message);

		return {
			errorTitle: "Error Validation",
			errorDesc,
		};
	}

	await prisma.flight.update({
		where: { id },
		data: {
			...validate.data,
			price: Number.parseInt(validate.data.price),
		},
	});

	revalidatePath("/dashboard/flights");
	redirect("/dashboard/flights");
}

export async function deleteFlight(id: string) {
	try {
		await prisma.flightSeat.deleteMany({ where: { flightId: id } });
		await prisma.flight.delete({ where: { id } });
	} catch (error) {
		console.log(error);
	}

	revalidatePath("/dashboard/flights");
}
