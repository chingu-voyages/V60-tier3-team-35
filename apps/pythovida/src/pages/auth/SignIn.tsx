import { SignIn } from "@clerk/react";

export default function SignInPage() {
	return (
		<SignIn
			appearance={{
				elements: {
					formButtonPrimary: "bg-primary",
				},
			}}
		/>
	);
}
