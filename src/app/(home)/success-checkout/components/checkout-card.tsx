"use client";

import React, { type FC } from "react";
import type { User } from "lucia";
import FlightCard from "../../checkout/components/flight-card";

interface CheckoutCardProps {
	user: User | null;
}

const CheckoutCard: FC<CheckoutCardProps> = ({ user }) => {
	return <FlightCard user={user} />;
};

export default CheckoutCard;
