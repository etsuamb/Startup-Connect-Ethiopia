"use client";

import NotificationBell from "@/components/NotificationBell";
import StartupProfileMenu from "@/components/startup/StartupProfileMenu";

export default function StartupTopBar({
	searchValue = "",
	onSearchChange,
	onSearchSubmit,
	searchPlaceholder = "Search startup workspace...",
	showSearch = true,
	profileName = "My Startup",
	profileSubtitle = "Startup account",
	refreshing = false,
	onRefresh,
}) {
	function handleSearchSubmit(event) {
		event.preventDefault();
		if (onSearchSubmit) onSearchSubmit(searchValue);
	}

	return (
		<header className="sticky top-0 z-30 border-b border-gray-100 bg-white px-4 py-4 shadow-sm sm:px-8">
			<div className="flex items-center gap-4">
				{showSearch ? <form onSubmit={handleSearchSubmit} className="relative hidden w-full max-w-xl sm:block">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
						<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
						</svg>
					</div>
					<input
						type="search"
						value={searchValue}
						onChange={(event) => onSearchChange?.(event.target.value)}
						placeholder={searchPlaceholder}
						className="h-11 w-full rounded-full border border-gray-100 bg-[#f6f8f9] pl-10 pr-4 text-sm outline-none transition focus:border-[#0f3d32] focus:bg-white focus:ring-2 focus:ring-[#0f3d32]/10"
					/>
				</form> : null}

				<div className="ml-auto flex items-center gap-2 sm:gap-3">
					{onRefresh && (
						<button
							type="button"
							onClick={onRefresh}
							disabled={refreshing}
							className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-50 hover:text-[#0f3d32] disabled:opacity-50"
							aria-label="Refresh"
							title="Refresh"
						>
							<svg className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.58m15.36 2A8 8 0 0 0 4.58 9m0 0H9m11 11v-5h-.58m0 0a8 8 0 0 1-15.36-2m15.36 2H15" />
							</svg>
						</button>
					)}

					<NotificationBell />

					<StartupProfileMenu
						profileName={profileName}
						profileSubtitle={profileSubtitle}
					/>
				</div>
			</div>
		</header>
	);
}
