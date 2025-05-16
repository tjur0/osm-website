import { Logo } from "@/components/logo";
import Link from "next/link";
import { BookUser, CalendarSearch, MapPin, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <>
      <Logo />
      <div className="flex flex-col gap-2 items-center">
        <Link href={"/poi/Nederland"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Punten van interesse"
            asChild
          >
            <MapPin className="text-gray-200" />
          </Button>
        </Link>
        <Link href={"/events"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Evenementen"
            asChild
          >
            <CalendarSearch className="text-gray-200" />
          </Button>
        </Link>
        <Link href={"/docs"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Documentatie"
            asChild
          >
            <ScrollText className="text-gray-200" />
          </Button>
        </Link>
        <Link href={"/contact"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Documentatie"
            asChild
          >
            <BookUser className="text-gray-200" />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <ModeToggle />
      </div>
    </>
  );
}
