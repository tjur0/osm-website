import { Logo } from "@/components/logo";
import Link from "next/link";
import { CalendarSearch, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <Logo />
      <div className="flex flex-col gap-2 items-center">
        <Link href={"/poi/Nederland?skipZoom=true"} className="size-12">
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
        {/* <Link href={"/community"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Gemeenschap"
            asChild
          >
            <ScrollText className="text-gray-200" />
          </Button>
        </Link> */}
      </div>
      <div className="flex flex-col gap-2 items-center">
        {/* <Link href={"/settings"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Instellingen"
            asChild
          >
            <Settings className="text-gray-200" />
          </Button>
        </Link> */}

        {/* <ModeToggle /> */}
      </div>
    </>
  );
}
