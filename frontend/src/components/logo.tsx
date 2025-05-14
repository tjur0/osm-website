import Link from "next/link";
import Image from "next/image";

const sizeClass = `size-[60px]`;
const size = 60;

export function Logo() {
  return (
    <Link
      href="/"
      className="text-black dark:text-white text-decoration-none flex text-lg items-center select-none"
      aria-label="Home pagina"
    >
      <Image
        className={sizeClass}
        alt="Het logo van OpenStreetMap Nederland"
        width={size}
        height={size}
        src="/OSMNL_Square.svg"
        priority={true}
      ></Image>

      {/* <span className="flex flex-col">
          <span className="font-semibold text-[18px]">OpenStreetMap</span>
          <span className="text-gray-700 text-sm font-medium text-muted-foreground dark:text-muted-foreground relative bottom-1">
            Nederland
          </span>
        </span> */}
    </Link>
  );
}
