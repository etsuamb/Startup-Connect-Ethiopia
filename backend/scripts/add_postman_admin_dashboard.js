/**
 * Adds Admin Dashboard folder to the main Postman collection.
 * Run: node scripts/add_postman_admin_dashboard.js
 */
const fs = require("fs");
const path = require("path");

const collectionPath = path.join(
	__dirname,
	"..",
	"Connect Startup Backend API.postman_collection.json",
);

const base = "http://localhost:5000/api/admin/dashboard";
const authHeader = [{ key: "Authorization", value: "Bearer {{token}}" }];

function req(name, method, urlPath, body) {
	const parts = urlPath.replace(/^\//, "").split("/");
	const item = {
		name,
		request: {
			method,
			header: [...authHeader],
			url: {
				raw: `${base}${urlPath}`,
				host: ["http://localhost:5000"],
				path: ["api", "admin", "dashboard", ...parts],
			},
		},
	};
	if (body) {
		item.request.header.push({
			key: "Content-Type",
			value: "application/json",
		});
		item.request.body = {
			mode: "raw",
			raw: JSON.stringify(body, null, 2),
		};
	}
	return item;
}

const folder = {
	name: "Admin Dashboard",
	item: [
		req("List Startups", "GET", "/startups"),
		req("Get Startup", "GET", "/startups/1"),
		req("Update Startup Status", "PATCH", "/startups/1/status", {
			status: "Active",
			comment: "Approved for listing",
		}),
		req("List Mentors", "GET", "/mentors"),
		req("Get Mentor", "GET", "/mentors/1"),
		req("Approve Mentor", "PATCH", "/mentors/1/approval", {
			approved: true,
		}),
		req("List Investors", "GET", "/investors"),
		req("Get Investor", "GET", "/investors/1"),
		req("Approve Investor", "PATCH", "/investors/1/approval", {
			approved: true,
		}),
		req("List Funding Requests", "GET", "/funding"),
		req("Get Funding Request", "GET", "/funding/1"),
		req("Approve Funding Request", "PATCH", "/funding/1/approval", {
			status: "approved",
			comment: "Approved by admin",
		}),
		req("List Documents", "GET", "/documents"),
		req("Get Document", "GET", "/documents/1"),
		req("Verify Document", "PATCH", "/documents/1/verification", {
			verification_status: "verified",
			source: "document",
		}),
		req("List Events", "GET", "/events"),
		req("Get Event", "GET", "/events/1"),
		req("List Chat Conversations", "GET", "/chat/conversations"),
		req("Get Chat Messages", "GET", "/chat/conversations/1/messages?type=investor"),
		req("Get Chat Video Status", "GET", "/chat/conversations/1/video/status?type=investor"),
		req("Analytics — System", "GET", "/analytics/system"),
		req("Analytics — Startups", "GET", "/analytics/startups"),
		req("Analytics — Funding", "GET", "/analytics/funding"),
		req("Analytics — Engagement", "GET", "/analytics/engagement"),
	],
};

const raw = fs.readFileSync(collectionPath, "utf8");
const collection = JSON.parse(raw);

const idx = collection.item.findIndex((i) => i.name === "Admin Dashboard");
if (idx >= 0) collection.item.splice(idx, 1);
collection.item.push(folder);

if (!collection.variable.some((v) => v.key === "adminStartupId")) {
	collection.variable.push({ key: "adminStartupId", value: "1" });
}

fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
console.log("Admin Dashboard folder added to Postman collection.");
