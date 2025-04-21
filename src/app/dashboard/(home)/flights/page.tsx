import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React, { type FC } from "react";
import { getFlights } from "./lib/data";
import { columns } from "./components/columns-flight";

// interface FlightPageProps {

// }

export const metadata: Metadata = {
	title: "SkyFly | Flights",
};

const FlightPage: FC = async () => {
	const data = await getFlights();

	return (
		<>
			<div className="flex flex-row items-center justify-between">
				<div className="my-5 text-2xl font-bold">Flights</div>
				<Button asChild>
					<Link href={"/dashboard/flights/create"}>
						<Plus className="mr-2 h-4 w-4" />
						Add Data
					</Link>
				</Button>
			</div>
			<DataTable columns={columns} data={data} />
		</>
	);
};

export default FlightPage;
