/** Shared display helpers for admin UI */

export const profileFieldMap = {
	Startup: [
		["founder_full_name", "Founder / Representative"],
		["startup_name", "Startup Name"],
		["industry", "Industry"],
		["startup_tagline", "Tagline"],
		["business_stage", "Business Stage"],
		["startup_type", "Startup Type"],
		["founded_year", "Founded Year"],
		["region", "Region"],
		["city", "City"],
		["team_size", "Team Size"],
		["founder_role", "Founder Role"],
		["location", "Location"],
		["website", "Website"],
		["description", "Description"],
	],
	Investor: [
		["investor_type", "Investor Type"],
		["organization_name", "Organization"],
		["preferred_industry", "Preferred Industry"],
		["investment_stage", "Investment Stage"],
		["investment_budget", "Investment Budget"],
		["location_preference", "Location Preference"],
		["linked_in_or_website", "LinkedIn / Website"],
		["bio", "Bio"],
		["personal_verification", "Personal Verification"],
	],
	Mentor: [
		["headline", "Headline"],
		["expertise", "Expertise"],
		["years_experience", "Years of Experience"],
		["hourly_rate", "Hourly Rate"],
		["country", "Country"],
		["bio", "Bio"],
		["professional_title", "Professional Title"],
		["languages", "Languages"],
		["linkedin_or_portfolio", "LinkedIn / Portfolio"],
		["certification_credentials", "Certifications"],
		["availability_preference", "Availability Preference"],
		["session_pricing", "Session Pricing"],
		["current_organization", "Current Organization"],
		["current_title", "Current Title"],
		["primary_industry", "Primary Industry"],
		["secondary_industry", "Secondary Industry"],
		["city_location", "City / Location"],
		["mentor_platform", "Platform"],
		["session_frequency", "Session Frequency"],
		["required_time_slots", "Required Time Slots"],
		["mentoring_style", "Mentoring Style"],
		["notable_startups_mentored", "Notable Startups Mentored"],
		["key_achievement", "Key Achievement"],
	],
};

export function formatFieldValue(value) {
	if (value === null || value === undefined || value === "") return "Not provided";
	if (Array.isArray(value)) return value.length ? value.join(", ") : "Not provided";
	if (typeof value === "object") {
		try {
			return JSON.stringify(value, null, 2);
		} catch {
			return "Not provided";
		}
	}
	return String(value);
}

export const ENTITY_TYPE_LABELS = {
	users: "User account",
	startups: "Startup profile",
	investors: "Investor profile",
	mentors: "Mentor profile",
	projects: "Project / post",
	documents: "Document",
	mentor_documents: "Mentor document",
	payments: "Payment",
	investment_requests: "Funding request",
	investments: "Investment record",
	investment_disputes: "Investment dispute",
	content_flags: "Flagged content",
	audit_logs: "Audit log",
	platform_settings: "Platform setting",
	mentorship_requests: "Mentorship request",
	mentorship_sessions: "Mentorship session",
};

export function formatEntityType(type) {
	if (!type) return "—";
	return ENTITY_TYPE_LABELS[type] || type.replace(/_/g, " ");
}

export function formatEntityRef(log) {
	const type = formatEntityType(log.entity_type);
	if (log.entity_id == null) return type;
	return `${type} #${log.entity_id}`;
}

export function formatAuditAction(action) {
	if (!action) return "—";
	return action.replace(/_/g, " ");
}

export const DOCUMENT_SOURCE_LABELS = {
	document: "Startup / Investor",
	mentor_document: "Mentor",
};

export function formatDocumentSource(source) {
	return DOCUMENT_SOURCE_LABELS[source] || source || "—";
}

export function formatMonthLabel(value) {
	if (!value) return "—";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return String(value);
	return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

export function formatWeekLabel(value) {
	if (!value) return "—";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return String(value);
	return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
