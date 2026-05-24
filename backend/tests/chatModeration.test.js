/**
 * Quick moderation regex smoke test: node tests/chatModeration.test.js
 */
const chatModerationService = require("../services/chatModerationService");

const BLOCKED = [
	"Call me at 0911234567",
	"email me at founder@gmail.com",
	"visit https://example.com",
	"check www.scam-site.com",
	"join t.me/myusername",
	"wa.me/251911234567",
	"find me @telegramname",
];

const ALLOWED = [
	"Let's discuss the term sheet on StartupConnect",
	"Our startup raised 500000 ETB in seed",
	"Schedule the session through the platform calendar",
];

let failed = 0;

for (const text of BLOCKED) {
	const r = chatModerationService.validateMessage(text);
	if (r.isClean) {
		console.error("FAIL should block:", text);
		failed++;
	} else {
		console.log("OK blocked:", text.slice(0, 40), "→", r.reason);
	}
}

for (const text of ALLOWED) {
	const r = chatModerationService.validateMessage(text);
	if (!r.isClean) {
		console.error("FAIL should allow:", text, "→", r.reason);
		failed++;
	} else {
		console.log("OK allowed:", text.slice(0, 50));
	}
}

if (failed) {
	console.error(`\n${failed} test(s) failed`);
	process.exit(1);
}
console.log("\nAll moderation smoke tests passed");
