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
							? "bg-[#0a4d3c] text-white border-[#0a4d3c]"
							: "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
