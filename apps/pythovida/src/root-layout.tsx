import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

export default function App() {
	return (
		<BrowserRouter>
			<ClerkProvider
				publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
				<AppRoutes />
			</ClerkProvider>
		</BrowserRouter>
	);
}
