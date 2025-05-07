import React from "react";
import { EventClass, Event } from "@/types/event";
import { Metadata } from "next";
import { EventCard } from "@/components/event/event-card";
import { Title } from "@/components/elements/title";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenStreetMap Evenementen",
  description:
    "De aankomende en afgelopen evenementen van OpenStreetMap Nederland",
  keywords: ["OpenStreetMap", "Event", "OSM"],
};

const locations: string[] = [];

const addLocations = (events: Event[]) => {
  events.forEach((event: Event) => {
    if (event?.location?.short) {
      const splitLocation = event.location.short.split(",");
      const country = splitLocation[splitLocation.length - 1].trim();
      if (!locations.includes(country)) {
        locations.push(country);
      }
    }
  });
};

const getFutureEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events?in=nl", {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  addLocations(data);

  return data;
};

const getPastEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events/past?in=nl", {
    next: {
      revalidate: 60 * 60 * 24, // 1 day
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  addLocations(data);

  return data;
};

export default async function EventsPage() {
  let futureEvents: Event[] = [];
  let pastEvents: Event[] = [];

  try {
    futureEvents = await getFutureEvents();
    pastEvents = await getPastEvents();
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/`} aria-label="Terug naar de homepage">
        <ArrowLeft />
      </Link>

      <Title size="h1" title="Evenementen" />

      <div>
        <Title size="h2" title="Aankomende evenementen" />
        <div className="flex flex-col gap-4">
          {futureEvents.length === 0 ? (
            <p>Geen aankomende evenementen</p>
          ) : (
            futureEvents.map((event) => {
              const eventClass: EventClass = new EventClass(event);

              return <EventCard key={eventClass.id} event={eventClass} />;
            })
          )}
        </div>
      </div>

      <div>
        <Title size="h2" title="Afgelopen evenementen" />

        <div className="flex flex-col gap-4">
          {pastEvents.length === 0 ? (
            <p>Geen afgelopen evenementen</p>
          ) : (
            pastEvents.map((event) => {
              const eventClass: EventClass = new EventClass(event);

              return <EventCard key={eventClass.id} event={eventClass} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
