"use client";

import { useRouter } from "next/navigation";
import { useRegFlow } from "./RegFlowProvider";

export default function RegistrationStepForm({ nextHref, className = "", children }) {
	const router = useRouter();
	const { patchFields, setFile } = useRegFlow();

	return (
		<form
			className={className}
			onSubmit={(e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const updates = {};
				const fileEntries = {};

				for (const [k, v] of fd.entries()) {
					if (v instanceof File) {
						if (v.size > 0) {
							if (fileEntries[k]) {
								fileEntries[k] = Array.isArray(fileEntries[k])
									? [...fileEntries[k], v]
									: [fileEntries[k], v];
							} else {
								fileEntries[k] = v;
							}
						}
					} else if (typeof v === "string") {
						if (updates[k] !== undefined) {
							updates[k] = Array.isArray(updates[k])
								? [...updates[k], v]
								: [updates[k], v];
						} else {
							updates[k] = v;
						}
					}
				}

				for (const [name, value] of Object.entries(fileEntries)) {
					setFile(name, value);
				}

				if (updates.phone_tail != null && updates.phone_tail !== "") {
					const d = String(updates.phone_tail).replace(/\D/g, "");
					updates.phone_number = d.startsWith("251")
						? `+${d}`
						: `+251${d}`;
					delete updates.phone_tail;
				}

				if (
					updates.phone_number &&
					!String(updates.phone_number).startsWith("+")
				) {
					const d = String(updates.phone_number).replace(/\D/g, "");
					updates.phone_number = d.startsWith("251")
						? `+${d}`
						: `+251${d}`;
				}

				patchFields(updates);
				router.push(nextHref);
			}}
		>
			{children}
		</form>
	);
}
