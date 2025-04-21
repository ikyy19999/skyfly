import type { ColumnDef } from "@tanstack/react-table";
import { User } from "../../../../../../prisma";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "passport",
		header: "Passport",
	},
];
