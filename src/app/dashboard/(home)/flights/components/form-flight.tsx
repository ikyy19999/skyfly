"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import SubmitButtonForm from "../../components/submit-form-button";
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { useFormState } from "react-dom";
import { dateFormat } from "@/lib/utils";
import { saveFlight, updateFlight } from "../lib/action";
import { Airplane, Flight } from "../../../../../../prisma";

interface FormFlightProps {
	airplanes: Airplane[];
	type?: "ADD" | "EDIT";
	defaultValues?: Flight | null;
}

const initialFormState: ActionResult = {
	errorTitle: null,
	errorDesc: [],
};

export default function FormFlight({
	airplanes,
	defaultValues = null,
	type,
}: FormFlightProps) {
	const updateFlightWithId = (_state: ActionResult, formData: FormData) =>
		updateFlight(null, defaultValues ? defaultValues.id : null, formData);

	const [state, formAction] = useFormState(
		type === "ADD" ? saveFlight : updateFlightWithId,
		initialFormState
	);

	return (
		<form action={formAction} className="space-y-6">
			{state?.errorTitle !== null && (
				<div className=" my-7 bg-red-500 p-4 rounded-lg text-white">
					<div className="font-bold mb-4">{state.errorTitle}</div>

					<ul className="list-disc list-inside">
						{state.errorDesc?.map((value, index) => (
							<li key={index + value}>{value}</li>
						))}
					</ul>
				</div>
			)}

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="planeId">Choose airplane</Label>
					<Select
						name="planeId"
						defaultValue={defaultValues?.planeId}
					>
						<SelectTrigger id="planeId">
							<SelectValue placeholder="Choose airplane" />
						</SelectTrigger>
						<SelectContent>
							{airplanes.map((value) => (
								<SelectItem key={value.id} value={value.id}>
									{value.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="price">Ticket Price</Label>
					<Input
						placeholder="Ticket Price..."
						name="price"
						id="price"
						type="number"
						min={0}
						defaultValue={defaultValues?.price}
						required
					/>
					<span className="text-xs text-gray-900">
						Harga untuk kelas busineess bertambah Rp 500.000 & kelas
						first bertambah Rp 750.000
					</span>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label htmlFor="departureCity">Departure City</Label>
					<Input
						placeholder="Departure City..."
						name="departureCity"
						id="departureCity"
						defaultValue={defaultValues?.departureCity}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="departureDate">Departure Date</Label>
					<Input
						type="datetime-local"
						placeholder="Departure Date..."
						name="departureDate"
						id="departureDate"
						className="block"
						defaultValue={
							defaultValues?.departureDate
								? dateFormat(
										defaultValues?.departureDate,
										"YYYY-MM-DDTHH:MM"
								  )
								: undefined
						}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="departureCityCode">Departure City Code</Label>
					<Input
						placeholder="Departure City Code..."
						name="departureCityCode"
						id="departureCityCode"
						defaultValue={defaultValues?.departureCityCode}
						required
					/>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label htmlFor="destinationCity">Destination City</Label>
					<Input
						placeholder="Destination City..."
						name="destinationCity"
						id="destinationCity"
						defaultValue={defaultValues?.destinationCity}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="arrivalDate">Arrival Date</Label>
					<Input
						type="datetime-local"
						placeholder="Arrival Date..."
						name="arrivalDate"
						id="arrivalDate"
						defaultValue={
							defaultValues?.arrivalDate
								? dateFormat(
										defaultValues?.arrivalDate,
										"YYYY-MM-DDTHH:MM"
								  )
								: undefined
						}
						className="block"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="destinationCityCode">Destination City Code</Label>
					<Input
						placeholder="Destination City Code..."
						name="destinationCityCode"
						id="destinationCityCode"
						defaultValue={defaultValues?.destinationCityCode}
						required
					/>
				</div>
			</div>

			<SubmitButtonForm />
		</form>
	);
}
