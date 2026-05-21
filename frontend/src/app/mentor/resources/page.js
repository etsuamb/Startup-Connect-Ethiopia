"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMentorResources, shareResource } from "@/lib/mentorApi";

export default function MentorResourcesPage() {
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({
		mentorship_request_id: "",
		resource_title: "",
		resource_description: "",
		resource_type: "link",
		external_url: "",
	});

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const data = await fetchMentorResources();
			setResources(Array.isArray(data) ? data : data.resources || []);
		} catch (ex) {
			setError(ex.message || "Failed to load resources");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	async function onShare(e) {
		e.preventDefault();
		setError("");
		try {
			const fd = new FormData();
			fd.append("mentorship_request_id", form.mentorship_request_id);
			fd.append("resource_title", form.resource_title);
			fd.append("resource_description", form.resource_description);
			fd.append("resource_type", form.resource_type);
			if (form.external_url) fd.append("external_url", form.external_url);
			await shareResource(fd);
			setShowForm(false);
			await load();
		} catch (ex) {
			setError(ex.message || "Share failed");
		}
	}

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Resources</h1>
				<button
					type="button"
					onClick={() => setShowForm(!showForm)}
					className="px-4 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold"
				>
					Share resource
				</button>
			</div>

			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			{showForm ? (
				<form onSubmit={onShare} className="mb-8 bg-white rounded-2xl p-6 border space-y-3">
					<input
						type="number"
						placeholder="Mentorship request ID"
						value={form.mentorship_request_id}
						onChange={(e) => setForm({ ...form, mentorship_request_id: e.target.value })}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<input
						type="text"
						placeholder="Title"
						value={form.resource_title}
						onChange={(e) => setForm({ ...form, resource_title: e.target.value })}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<textarea
						placeholder="Description"
						value={form.resource_description}
						onChange={(e) => setForm({ ...form, resource_description: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<select
						value={form.resource_type}
						onChange={(e) => setForm({ ...form, resource_type: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					>
						<option value="link">Link</option>
						<option value="note">Note</option>
						<option value="file">File</option>
					</select>
					<input
						type="url"
						placeholder="External URL (for links)"
						value={form.external_url}
						onChange={(e) => setForm({ ...form, external_url: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<button type="submit" className="px-6 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold">
						Share
					</button>
				</form>
			) : null}

			{loading ? (
				<p className="text-gray-500 text-sm">Loading…</p>
			) : resources.length === 0 ? (
				<p className="text-gray-500 text-sm">No resources shared yet.</p>
			) : (
				<ul className="space-y-3">
					{resources.map((r) => (
						<li key={r.resource_id} className="bg-white rounded-xl p-4 border border-gray-100">
							<p className="font-bold text-sm">{r.resource_title}</p>
							<p className="text-xs text-gray-500 capitalize mt-1">{r.resource_type}</p>
							{r.external_url ? (
								<a href={r.external_url} className="text-xs text-[#115543] mt-1 block" target="_blank" rel="noreferrer">
									{r.external_url}
								</a>
							) : null}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
