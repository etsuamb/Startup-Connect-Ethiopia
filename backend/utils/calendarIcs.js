function pad(value) {
	return String(value).padStart(2, "0");
}

function formatIcsDate(value) {
	const date = value instanceof Date ? value : new Date(value);
	return [
		date.getUTCFullYear(),
		pad(date.getUTCMonth() + 1),
		pad(date.getUTCDate()),
		"T",
		pad(date.getUTCHours()),
		pad(date.getUTCMinutes()),
		pad(date.getUTCSeconds()),
		"Z",
	].join("");
}

function escapeIcsText(value = "") {
	return String(value)
		.replace(/\\/g, "\\\\")
		.replace(/\n/g, "\\n")
		.replace(/;/g, "\\;")
		.replace(/,/g, "\\,");
}

function foldLine(line) {
	const chunks = [];
	let remaining = line;
	while (remaining.length > 75) {
		chunks.push(remaining.slice(0, 75));
		remaining = ` ${remaining.slice(75)}`;
	}
	chunks.push(remaining);
	return chunks.join("\r\n");
}

function addMinutes(value, minutes) {
	const date = value instanceof Date ? value : new Date(value);
	return new Date(date.getTime() + Number(minutes || 60) * 60000);
}

function buildIcsEvent({
	uid,
	title,
	description,
	location,
	url,
	start,
	end,
	created,
	updated,
}) {
	const now = new Date();
	const lines = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//StartupConnect//Calendar Export//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		"BEGIN:VEVENT",
		`UID:${escapeIcsText(uid)}`,
		`DTSTAMP:${formatIcsDate(now)}`,
		`DTSTART:${formatIcsDate(start)}`,
		`DTEND:${formatIcsDate(end)}`,
		`CREATED:${formatIcsDate(created || now)}`,
		`LAST-MODIFIED:${formatIcsDate(updated || now)}`,
		`SUMMARY:${escapeIcsText(title)}`,
	];

	if (description) lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
	if (location) lines.push(`LOCATION:${escapeIcsText(location)}`);
	if (url) lines.push(`URL:${escapeIcsText(url)}`);

	lines.push("END:VEVENT", "END:VCALENDAR");
	return `${lines.map(foldLine).join("\r\n")}\r\n`;
}

function sendIcs(res, filename, ics) {
	res.setHeader("Content-Type", "text/calendar; charset=utf-8");
	res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
	return res.status(200).send(ics);
}

module.exports = {
	addMinutes,
	buildIcsEvent,
	sendIcs,
};
