"use client";

import Link from "next/link";

export default function AdminSupportPage() {
	return (
		<div className="max-w-3xl mx-auto pb-12">
			<section className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-3xl font-bold mb-2">Admin support</h1>
				<p className="text-slate-300 text-sm">Quick links and platform contacts for administrators.</p>
			</section>

			<div className="bg-white rounded-2xl border border-slate-100 p-8 space-y-6">
				<div>
					<h2 className="font-bold text-slate-900 mb-2">Platform contacts</h2>
					<ul className="text-sm text-slate-600 space-y-2">
						<li>
							<strong>Technical issues:</strong> Check{" "}
							<Link href="/admin/activity" className="text-emerald-700 font-semibold hover:underline">
								System activity
							</Link>{" "}
							for database health and error logs.
						</li>
						<li>
							<strong>Security:</strong> Review{" "}
							<Link href="/admin/activity" className="text-emerald-700 font-semibold hover:underline">
								System activity
							</Link>{" "}
							for failed logins and audit logs.
						</li>
						<li>
							<strong>User disputes:</strong> Use{" "}
							<Link href="/admin/users" className="text-emerald-700 font-semibold hover:underline">
								Users
							</Link>{" "}
							to approve, reject, or suspend accounts.
						</li>
						<li>
							<strong>Payments:</strong>{" "}
							<Link href="/admin/payments" className="text-emerald-700 font-semibold hover:underline">
								Payment transactions
							</Link>
						</li>
					</ul>
				</div>

				<div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
					<p className="text-xs font-bold text-slate-500 uppercase mb-2">Public support</p>
					<p className="text-sm text-slate-600">
						End users can reach the platform via the public{" "}
						<Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
							Contact
						</Link>{" "}
						page.
					</p>
				</div>
			</div>
		</div>
	);
}
