import type { Metadata } from "next";
import React, { type FC } from "react";
import { getAirplanes } from "../../airplanes/lib/data";
import FormFlight from "../components/form-flight";

// interface CreateFlightPageProps {

// }

export const metadata: Metadata = {
	title: "SkyFly | create data flights",
};

const CreateFlightPage: FC = async () => {
	const airplanes = await getAirplanes();

	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				<div className="my-5 text-2xl font-bold">
					Add Data
				</div>
			</div>

			<FormFlight type="ADD" airplanes={airplanes} />
		</div>
	);
};

export default CreateFlightPage;
