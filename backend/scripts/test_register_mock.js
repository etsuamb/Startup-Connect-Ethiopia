const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { register } = require("../controllers/authController");

function mockFile(name) {
	return {
		buffer: Buffer.from("%PDF-1.4 test"),
		originalname: name,
		mimetype: "application/pdf",
		size: 12,
	};
}

async function run(label, body, files = {}) {
	const status = { code: 200, body: null };
	const res = {
		status(c) {
			status.code = c;
			return this;
		},
		json(data) {
			status.body = data;
		},
	};
	const req = { body, files, headers: {} };
	try {
		await register(req, res);
	} catch (e) {
		console.log(label, "THREW", e.message);
		return;
	}
	const msg = status.body?.message || status.body?.error;
	console.log(label, status.code, msg);
}

async function main() {
	const ts = Date.now();
	const base = {
		first_name: "A",
		last_name: "B",
		password: "Test1234!",
		confirm_password: "Test1234!",
		phone_number: `09${String(ts).slice(-8)}`,
	};

	await run(
		"investor full",
		{
			...base,
			email: `inv${ts}@gmail.com`,
			role: "Investor",
			investor_type: "Angel Investor",
			preferred_industry: "Tech",
			investment_stage: "Seed",
			investment_range: "10000",
			location_preference: "Addis",
			linked_in_or_website: "https://example.com",
			bio: "bio text here",
			personal_verification: "Passport",
		},
		{
			registration_doc: [mockFile("reg.pdf")],
			trade_license: [mockFile("trade.pdf")],
			tin_certificate: [mockFile("tin.pdf")],
		},
	);

	await run(
		"mentor full",
		{
			...base,
			email: `men${ts}@gmail.com`,
			role: "Mentor",
			professional_title: "CTO",
			year_of_experience: "5",
			language: "English",
			expertise_area: "Product",
			professional_bio: "Bio long enough",
			linkedin_portfolio: "https://linkedin.com/in/test",
			certification_credentials: "AWS",
			availability_preference: "Weekends",
			session_pricing: "50",
			current_organization: "Org",
			current_title: "Title",
			primary_industry: "Tech",
			city_location: "Addis",
			mentor_platform: "Zoom",
			session_frequency: "Weekly",
			required_time_slots: "Mon 6pm",
			mentoring_style: "Hands-on",
			notable_startups_mentored: "Startup X",
			key_achievement: "Built Y",
		},
		{
			mentor_id: [mockFile("id.pdf")],
			certifications: [mockFile("cert.pdf")],
		},
	);
}

main().catch(console.error);
