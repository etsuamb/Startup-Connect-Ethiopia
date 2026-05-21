"use client";

import { useEffect } from "react";
import { useRegFlow } from "./RegFlowProvider";

/** Fills backend-required mentor fields not captured by the marketing UI */
export default function MentorApiPrefill() {
	const { patchFields } = useRegFlow();
	useEffect(() => {
		patchFields({
			current_organization: "Independent",
			current_title: "Mentor",
			primary_industry: "Technology",
			secondary_industry: "",
			city_location: "Addis Ababa",
			mentor_platform: "Remote",
			session_frequency: "Weekly",
			required_time_slots: JSON.stringify([
				{ day: "Tuesday", window: "18:00–20:00 EAT" },
			]),
			mentoring_style: "Collaborative",
			notable_startups_mentored: "Early-stage ventures in East Africa",
			key_achievement: "Led product and GTM programs for growth-stage teams",
		});
	}, [patchFields]);
	return null;
}
