import logo from "@/assets/logo.svg";
import { SignOutButton, useAuth } from "@clerk/react";
import { Button } from "@repo/ui/components/button";
import { ArrowUpRight, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";

export function Header() {
	const { isSignedIn } = useAuth();
	const location = useLocation();

	return (
		<header className="flex justify-between items-center py-4 px-5">
			<img src={logo} alt="pythovida logo" />

			<nav className="hidden md:flex gap-6 px-6 py-2">
				{/* // TODO: Add navigation links and other header elements and make it responsive */}
					<Link to="/" className="font-sans text-sm font-bold text-base text-accent4 hover:text-link transition-colors duration-200">My Garden</Link>
					<Link to="/" className="font-sans text-sm font-bold text-base text-accent4 hover:text-link transition-colors duration-200">Plant Library</Link>
					<Link to="/" className="font-sans text-sm font-bold text-base text-accent4 hover:text-link transition-colors duration-200">Guides</Link>
					<Link to="/" className="font-sans text-sm font-bold text-base text-accent4 hover:text-link transition-colors duration-200">Community</Link>
			</nav>
			{!isSignedIn ? (
				<Button className="rounded-full" asChild>
					<Link to="/auth/sign-in" state={{ from: location.pathname }}>
						<span className="sr-only">Log in</span>
						Log in
						<ArrowUpRight />
					</Link>
				</Button>
				) : (
				<SignOutButton>
					<Button variant="destructive" className="rounded-full">
						<span className="sr-only">Log out</span>
						Log out
						<LogOut />
					</Button>
				</SignOutButton>
			)}
		</header>
	);
}
