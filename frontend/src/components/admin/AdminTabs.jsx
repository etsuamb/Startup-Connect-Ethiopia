"use client";

export default function AdminTabs({ tabs, active, onChange }) {
	return (
		<div className="flex flex-wrap gap-2 mb-6">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					type="button"
					onClick={() => onChange(tab.id)}
					className={`px-4 py-2 rounded-full text-xs font-bold border transition ${
						active === tab.id
							? "bg-emerald-600 text-white border-emerald-600"
							: "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
