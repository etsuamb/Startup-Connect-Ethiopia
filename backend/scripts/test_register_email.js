const authSecurity = require("../services/authSecurityService");

async function main() {
	const tests = [
		"test@gmail.com",
		"fake@nonexistentdomain12345xyz.com",
		"bad@mailinator.com",
		"not-an-email",
	];
	for (const e of tests) {
		try {
			const r = await authSecurity.validateEmailDeliverability(e);
			console.log(e, "->", r);
		} catch (err) {
			console.log(e, "THREW", err.message);
		}
	}
}

main();
