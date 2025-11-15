import { Logo } from "@/components/logo";
import Link from "next/link";
import {
  BookUser,
  CalendarSearch,
  MapPin,
  ScrollText,
  MessageCircleHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <>
      <Logo />
      <div className="flex flex-col gap-2 items-center">
        {/* <Link href={"/search"} className="size-12">
          <Button
            variant="ghost"
            className="size-12"
            aria-label="Zoeken"
            asChild
          >
            <div className="size-12 p-3">
              <Search className="text-gray-200 size-6" />
              <span className= "sr-only">Zoeken</span>
            </div>
          </Button>
        </Link> */}
        <Link href={"/poi/Nederland"} className="size-12">
          <Button
            variant="ghost"
            className="size-12"
            aria-label="Punten van interesse"
            asChild
          >
            <div className="size-12 p-3">
              <MapPin className="text-gray-200 size-6" />
              <span className="sr-only">Punten van interesse</span>
            </div>
          </Button>
        </Link>
        <Link href={"/events"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Evenementen"
            asChild
          >
            <div className="size-12 p-3">
              <CalendarSearch className="text-gray-200 size-6" />
              <span className="sr-only">Evenementen</span>
            </div>
          </Button>
        </Link>
        <Link href={"/docs"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Documentatie"
            asChild
          >
            <div className="size-12 p-3">
              <ScrollText className="text-gray-200 size-6" />
              <span className="sr-only">Documentatie</span>
            </div>
          </Button>
        </Link>
        <Link href={"/contact"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Contact"
            asChild
          >
            <div className="size-12 p-3">
              <BookUser className="text-gray-200 size-6" />
              <span className="sr-only">Contact</span>
            </div>
          </Button>
        </Link>
        <Link href={"/feedback"} className="size-12">
          <Button
            variant="ghost"
            className="size-12 p-3"
            aria-label="Feedback"
            asChild
          >
            <div className="size-12 p-3">
              <MessageCircleHeart className="text-gray-200 size-6" />
              <span className="sr-only">Feedback</span>
            </div>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <ModeToggle />
      </div>
    </>
  );
}
