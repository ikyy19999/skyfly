"use client";

import React, { type FC, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import SeatProvider from "./providers/seat-provider";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<SeatProvider>
			{children} <Toaster />
		</SeatProvider>
	);
};

export default Layout;
