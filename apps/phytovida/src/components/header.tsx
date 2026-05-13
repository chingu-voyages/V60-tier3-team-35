import logo from "@/assets/logo.svg";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@repo/ui/components/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@repo/ui/components/sheet";
import { ArrowUpRight, LayoutDashboard, Leaf, type LucideIcon, Menu, Scan, Sprout, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

interface NavItem {
  label: string;
  href: string;
  /** If set, this href is used when the user is signed in */
  authHref?: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",    href: "/auth/sign-in", authHref: "/dashboard",     icon: LayoutDashboard },
  { label: "My Garden",    href: "/auth/sign-in", authHref: "/my-garden",     icon: Leaf            },
  { label: "Plant Library", href: "/plant-library",                            icon: Sprout          },
  { label: "PhytoScan",    href: "/ask-ai",                                   icon: Scan            },
];

const desktopLinkClass =
  "font-sans text-sm font-bold text-accent4 hover:text-link transition-colors duration-200";
const mobileLinkClass =
  "text-accent4 hover:text-link transition-colors duration-200";

function resolveHref(item: NavItem, isSignedIn: boolean): string {
  return isSignedIn && item.authHref ? item.authHref : item.href;
}

interface MobileNavLinkProps {
  item: NavItem;
  isSignedIn: boolean;
  onClick: () => void;
}

function MobileNavLink({ item, isSignedIn, onClick }: MobileNavLinkProps) {
  const Icon = item.icon;
  return (
    <Link to={resolveHref(item, isSignedIn)} onClick={onClick} className={mobileLinkClass}>
      <span className="flex items-center gap-2">
        <Icon width={20} height={20} />
        {item.label}
      </span>
    </Link>
  );
}

export function Header() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [isSignedIn]);

  return (
    <header className="relative flex items-center justify-between px-5 py-4">
      <Link to="/">
        <img src={logo} alt="PhytoVida logo" />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden gap-6 px-6 py-2 md:flex">
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} to={resolveHref(item, isSignedIn ?? false)} className={desktopLinkClass}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop auth */}
      <div className="hidden md:block">
        {isSignedIn ? (
          <UserButton
            appearance={{ elements: { userButtonAvatarBox: "h-16 w-16 rounded-full border border-accent2" } }}
          />
        ) : (
          <Button className="rounded-full" asChild>
            <Link to="/auth/sign-in" state={{ from: location.pathname }}>
              Log in
              <ArrowUpRight />
            </Link>
          </Button>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        {!menuOpen && (
          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Mobile sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
        <SheetContent className="w-full max-w-sm">
          <SheetHeader className="p-6">
            <SheetTitle className="pb-4">
              <Link to="/" onClick={closeMenu}>PhytoVida</Link>
            </SheetTitle>
            <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>

            {isSignedIn ? (
              <div className="flex items-center gap-3 border-b p-4">
                <UserButton />
                <div className="flex flex-col">
                  <span className="font-medium">{user?.fullName}</span>
                  <span className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            ) : (
              <div className="border-b p-4">
                <Link to="/auth/sign-in" state={{ from: location.pathname }}>
                  <span className="flex items-center gap-2 font-bold text-primary">
                    <User />
                    Log in
                  </span>
                </Link>
              </div>
            )}
          </SheetHeader>

          <div className="flex h-full w-full flex-col gap-4 pl-16">
            {NAV_ITEMS.map((item) => (
              <MobileNavLink
                key={item.label}
                item={item}
                isSignedIn={isSignedIn ?? false}
                onClick={closeMenu}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
