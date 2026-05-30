"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchDashboardDocuments, openAdminDocument, updateDocumentVerification } from "@/lib/adminApi";
import { formatDocumentSource } from "@/lib/adminDisplay";
import AdminTabs from "@/components/admin/AdminTabs";

const TABS = [
	{ id: "pending", label: "Pending" },
	{ id: "verified", label: "Verified" },
	{ id: "rejected", label: "Rejected" },
	{ id: "all", label: "All" },
];

function docId(doc) {
	return doc.document_id ?? doc.id;
}

export default function AdminDocumentsPage() {
	const [tab, setTab] = useState("pending");
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
	const [viewingId, setViewingId] = useState(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const status = tab === "all" ? undefined : tab === "verified" ? "verified" : tab;
			const data = await fetchDashboardDocuments({ status, limit: 200 });
			setDocs(data.documents || []);
		} catch (ex) {
			setError(ex.message || "Failed to load documents");
		} finally {
			setLoading(false);
		}
	}, [tab]);

	useEffect(() => {
		load();
	}, [load]);

	async function review(doc, decision) {
		setMsg("");
		const id = docId(doc);
		try {
			await updateDocumentVerification(id, decision, "", doc.source || "document");
			setMsg(`Document marked ${decision}`);
			await load();
		} catch (ex) {
			setError(ex.message || "Update failed");
		}
	}

	async function viewDocument(doc) {
		const id = docId(doc);
		setViewingId(id);
		setError("");
		try {
			await openAdminDocument(id, {
				isMentorDocument: doc.source === "mentor_document",
			});
		} catch (ex) {
			setError(ex.message || "Unable to open document");
		} finally {
			setViewingId(null);
		}
	}

	return (
		<div className="max-w-7xl mx-auto pb-12">
			<section className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-3xl font-bold mb-2">Document verification</h1>
				<p className="text-slate-300 text-sm max-w-2xl">
					Review KYC and registration files uploaded by startups, investors, and mentors. Open each file before approving or rejecting.
				</p>
			</section>

			{error ? <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div> : null}
			{msg ? <div className="mb-4 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm">{msg}</div> : null}

			<AdminTabs tabs={TABS} active={tab} onChange={setTab} />

			<div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
				{loading ? (
					<p className="p-8 text-slate-500 text-sm">Loading documents…</p>
				) : docs.length === 0 ? (
					<p className="p-8 text-slate-500 text-sm">No documents in this queue.</p>
				) : (
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
							<tr>
								<th className="px-4 py-3">File</th>
								<th className="px-4 py-3">Submitted by</th>
								<th className="px-4 py-3">Type</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{docs.map((d) => {
								const id = docId(d);
								return (
									<tr key={`${d.source}-${id}`} className="border-t border-slate-100">
										<td className="px-4 py-3 font-medium">{d.file_name || "Document"}</td>
										<td className="px-4 py-3 text-slate-600">{formatDocumentSource(d.source)}</td>
										<td className="px-4 py-3 text-slate-500">{d.file_type || d.description || "—"}</td>
										<td className="px-4 py-3">
											<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 capitalize">
												{d.verification_status || "pending"}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex flex-wrap gap-2">
												<button
													type="button"
													disabled={viewingId === id}
													onClick={() => viewDocument(d)}
													className="text-xs font-bold text-slate-700 hover:underline disabled:opacity-50"
												>
													{viewingId === id ? "Opening…" : "View file"}
												</button>
												<button
													type="button"
													onClick={() => review(d, "verified")}
													className="text-xs font-bold text-emerald-700 hover:underline"
												>
													Verify
												</button>
												<button
													type="button"
													onClick={() => review(d, "rejected")}
													className="text-xs font-bold text-red-600 hover:underline"
												>
													Reject
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
