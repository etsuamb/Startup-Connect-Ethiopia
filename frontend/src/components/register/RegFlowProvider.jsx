"use client";

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

const Ctx = createContext(null);

/** Multi-step registration: text fields + File objects kept in memory across steps */
export function RegFlowProvider({ role, children }) {
	const [fields, setFields] = useState({});
	const [files, setFiles] = useState({});

	const patchFields = useCallback((partial) => {
		setFields((prev) => ({ ...prev, ...partial }));
	}, []);

	const setFile = useCallback((name, file) => {
		setFiles((prev) => ({ ...prev, [name]: file }));
	}, []);

	const reset = useCallback(() => {
		setFields({});
		setFiles({});
	}, []);

	const value = useMemo(
		() => ({
			role,
			fields,
			files,
			patchFields,
			setFile,
			reset,
		}),
		[role, fields, files, patchFields, setFile, reset],
	);

	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRegFlow() {
	const v = useContext(Ctx);
	if (!v) {
		throw new Error("useRegFlow must be used under RegFlowProvider");
	}
	return v;
}
