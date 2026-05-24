"use client";

import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "@/lib/authApi";
import { setSession } from "@/lib/authStorage";
import { isGoogleAuthConfigured } from "@/lib/googleAuthConfig";
import { useRouter } from "next/navigation";

function routeAfterLogin(router, user) {
	const r = user?.role;
	if (r === "Startup") router.push("/startup/dashboard");
	else if (r === "Investor") router.push("/investor/dashboard");
	else if (r === "Mentor") router.push("/mentor/dashboard");
	else if (r === "Admin") router.push("/admin/dashboard");
	else router.push("/");
}

export default function GoogleSignInButton({ onError, role }) {
	const router = useRouter();

	if (!isGoogleAuthConfigured()) {
		return (
			<p className="text-center text-xs text-gray-400 font-medium">
				Google sign-in is unavailable. Set{" "}
				<code className="text-[10px] bg-gray-100 px-1 rounded">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> in{" "}
				<code className="text-[10px] bg-gray-100 px-1 rounded">frontend/.env.local</code>.
			</p>
		);
	}

	async function handleSuccess(credentialResponse) {
		try {
			const credential = credentialResponse?.credential;
			if (!credential) throw new Error("Google sign-in failed");

			const data = await googleAuth(credential, role);

			if (data.needsRoleSelection) {
				sessionStorage.setItem(
					"google_signup",
					JSON.stringify({
						googleSignupToken: data.googleSignupToken,
						profile: data.profile,
					}),
				);
				router.push("/login/google-role");
				return;
			}

			if (data.needsProfileCompletion) {
				sessionStorage.setItem("google_profile_token", data.googleSignupToken || "");
				const reg =
					data.role === "Investor"
						? "/register/investor"
						: data.role === "Mentor"
							? "/register/mentor"
							: "/register/startup";
				router.push(reg);
				return;
			}

			if (data.requires2FA) {
				sessionStorage.setItem(
					"pending_2fa",
					JSON.stringify({
						pendingToken: data.pendingToken,
						twoFactorMethod: data.twoFactorMethod,
					}),
				);
				router.push("/login/verify-2fa");
				return;
			}

			if (data.token) {
				setSession({
					token: data.token,
					refreshToken: data.refreshToken,
					role: data.user?.role,
					userName: `${data.user?.first_name || ""} ${data.user?.last_name || ""}`.trim(),
				});
				routeAfterLogin(router, data.user);
			}
		} catch (ex) {
			onError?.(ex.message || "Google sign-in failed");
		}
	}

	return (
		<div className="w-full flex justify-center [&>div]:!w-full">
			<GoogleLogin
				onSuccess={handleSuccess}
				onError={() => onError?.("Google sign-in was cancelled or failed")}
				theme="outline"
				size="large"
				text="continue_with"
				shape="rectangular"
				width="100%"
			/>
		</div>
	);
}
