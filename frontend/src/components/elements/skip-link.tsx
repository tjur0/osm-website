import Link from "next/link";

export default function SkipLink() {
  return (
    <Link
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-4 py-2 rounded shadow z-50"
    >
      Navigatie overslaan
    </Link>
  );
}
