const SENSITIVE_USER_FIELDS = ["email", "phone_number", "telegram", "whatsapp"];
const SENSITIVE_SOCIAL_FIELDS = [
	"linked_in_or_website",
	"linkedin_or_portfolio",
	"linkedin_url",
	"website",
	"external_url",
];
const SENSITIVE_ADDRESS_FIELDS = ["location", "street_address", "address", "exact_address"];

const HIDDEN_PLACEHOLDER = null;

function pickPublic(obj, allowKeys) {
	if (!obj || typeof obj !== "object") return obj;
	const out = { ...obj };
	for (const key of Object.keys(out)) {
		if (!allowKeys.includes(key) && !key.startsWith("privacy")) {
			// keep unknown public fields by default in list mode — strip only sensitive
		}
	}
	return out;
}

function redactFields(row, fields) {
	if (!row || typeof row !== "object") return row;
	const out = { ...row };
	for (const f of fields) {
		if (f in out && out[f] != null && out[f] !== "") {
			out[f] = HIDDEN_PLACEHOLDER;
			out[`${f}_hidden`] = true;
		}
	}
	return out;
}

function attachPrivacy(row, privacy) {
	if (!row || typeof row !== "object") return row;
	return { ...row, privacy };
}

/** Public discover list — never expose contact */
function sanitizeInvestorPublic(row) {
	if (!row) return row;
	let out = { ...row };
	out = redactFields(out, [
		...SENSITIVE_USER_FIELDS,
		...SENSITIVE_SOCIAL_FIELDS,
		"personal_verification",
		"uploaded_documents",
	]);
	out.privacy = {
		sensitive_visible: false,
		unlock_reason: "public_listing",
	};
	return out;
}

function sanitizeMentorPublic(row) {
	if (!row) return row;
	let out = { ...row };
	out = redactFields(out, [
		...SENSITIVE_USER_FIELDS,
		...SENSITIVE_SOCIAL_FIELDS,
		"uploaded_documents",
	]);
	// Keep coarse location (country, city_location) for discover
	out = redactFields(out, ["location"]);
	out.privacy = {
		sensitive_visible: false,
		unlock_reason: "public_listing",
	};
	return out;
}

function sanitizeStartupPublic(row) {
	if (!row) return row;
	let out = { ...row };
	out = redactFields(out, [
		...SENSITIVE_USER_FIELDS,
		...SENSITIVE_SOCIAL_FIELDS,
		"location",
		"uploaded_documents",
	]);
	out.privacy = {
		sensitive_visible: false,
		unlock_reason: "public_listing",
	};
	return out;
}

function sanitizeInvestor(row, access) {
	if (!row) return row;
	if (access?.sensitiveVisible) return attachPrivacy(row, access.privacy);
	return sanitizeInvestorPublic(row);
}

function sanitizeMentor(row, access) {
	if (!row) return row;
	if (access?.sensitiveVisible) return attachPrivacy(row, access.privacy);
	return sanitizeMentorPublic(row);
}

function sanitizeStartup(row, access) {
	if (!row) return row;
	if (access?.sensitiveVisible) return attachPrivacy(row, access.privacy);
	return sanitizeStartupPublic(row);
}

/** Documents: full metadata only when sensitive unlocked */
function sanitizeDocuments(documents, access) {
	if (!Array.isArray(documents)) return documents;
	if (access?.sensitiveVisible) {
		return documents.map(({ file_data, file_hash, ...doc }) => ({
			...doc,
			file_available: Boolean(file_data || doc.file_path),
		}));
	}
	return documents.map((doc) => ({
		document_id: doc.document_id ?? doc.mentor_document_id,
		file_type: doc.file_type ?? doc.document_type,
		file_name: doc.file_name ? "Document on file" : undefined,
		verification_status: doc.verification_status,
		created_at: doc.created_at,
		summary_only: true,
		file_path_hidden: true,
		file_data_hidden: true,
	}));
}

function sanitizeRecommendations(items, sanitizerFn) {
	if (!Array.isArray(items)) return items;
	return items.map((item) => {
		if (item.investor) {
			return { ...item, investor: sanitizerFn(item.investor) };
		}
		if (item.mentor) {
			return { ...item, mentor: sanitizerFn(item.mentor) };
		}
		if (item.startup) {
			return { ...item, startup: sanitizeStartupPublic(item.startup) };
		}
		return sanitizerFn(item);
	});
}

module.exports = {
	sanitizeInvestorPublic,
	sanitizeMentorPublic,
	sanitizeStartupPublic,
	sanitizeInvestor,
	sanitizeMentor,
	sanitizeStartup,
	sanitizeDocuments,
	sanitizeRecommendations,
	SENSITIVE_USER_FIELDS,
	SENSITIVE_SOCIAL_FIELDS,
};
