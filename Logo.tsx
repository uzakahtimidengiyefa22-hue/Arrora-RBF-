import Image from "next/image";
import Link from "next/link";

export default function Logo({ position = "left" }: { position?: "left" | "center" }) {
  return (
    <div className={`w-full flex ${position === "center" ? "justify-center" : "justify-start"}`}>
      <Link href="/">
        <Image src="/logo.png" alt="Arrora RBF Logo" width={120} height={120} priority />
      </Link>
    </div>
  );
}
