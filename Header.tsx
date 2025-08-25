import Link from "next/link";
import Logo from "./Logo";

export default function Header({ centerLogo = false }: { centerLogo?: boolean }) {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="container flex items-center justify-between py-4">
        <div className="flex-1">
          <Logo position={centerLogo ? "center" : "left"} />
        </div>
        {!centerLogo && (
          <nav className="flex items-center gap-6">
            <Link href="/deal" className="hover:underline">Refer a Deal</Link>
            <Link href="/login" className="hover:underline">Login/Sign up</Link>
            <Link href="/#contact" className="hover:underline">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
