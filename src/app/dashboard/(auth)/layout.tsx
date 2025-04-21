import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SkyFly | Sign In",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} text-white font-poppins bg-flysha-black`}
			>
				{children}
			</body>
		</html>
	);
}
