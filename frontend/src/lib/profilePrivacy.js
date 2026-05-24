/**
 * Helpers for profile privacy UI — mirrors backend `privacy` object on API responses.
 */

export const PRIVACY_DEFAULT_MESSAGE =
	"Contact details are protected. They unlock after both accounts are verified and a funding, mentorship, payment, or collaboration relationship is established on StartupConnect.";

export function isSensitiveVisible(entity) {
	if (!entity) return false;
	if (entity.privacy?.sensitive_visible === true) return true;
	return false;
}

export function privacyMessage(entity) {
	return entity?.privacy?.message || PRIVACY_DEFAULT_MESSAGE;
}

/** Show value or a locked placeholder for contact fields */
export function contactField(value, entity, { label = "Contact" } = {}) {
	if (isSensitiveVisible(entity)) {
		return value || null;
	}
	if (value == null || value === "") return null;
	return null;
}

export function lockedContactRows(entity, fields = []) {
	if (isSensitiveVisible(entity)) return [];
	const hidden = fields.filter((f) => entity?.[`${f.key}_hidden`] || entity?.[f.key] == null);
	if (!hidden.length && !entity?.privacy) return [];
	return [
		{
			type: "locked",
			message: privacyMessage(entity),
		},
	];
}
