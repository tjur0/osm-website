import { notFound } from "next/navigation";
import { EventClass, EventDetail } from "@/types/event";
import { Event } from "@/types/event";
import { env } from "process";
import Link from "next/link";
import { Metadata } from "next";
import { eclipse } from "@/lib/utils";
import { MarkdownWrapper } from "@/components/markdown-wrapper";
import { Title } from "@/components/elements/title";
import { ExternalButton } from "@/components/external-button";
import { ArrowLeft } from "lucide-react";

interface EventDetailPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const raw = await params;

  if (!raw) return notFound();

  const id = raw?.slug?.[1];
  if (!id) return notFound();

  const eventDetail = await getEventDetail(id);

  if (!eventDetail) return notFound();

  const keywords = eventDetail.name.split(" ");
  const keyword = `${keywords[0]} ${keywords[1]}`;

  return {
    title: eclipse(eventDetail.name, 50) + " OpenStreetMap event",
    description: eclipse(eventDetail.description, 200),
    keywords: ["OpenStreetMap", "Event", keyword, "OSM"],
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents();

  const eventClasses: EventClass[] = events.map(
    (event) => new EventClass(event)
  );

  const params = eventClasses.map((event) => {
    return {
      slug: [event.toHash(), event.id],
    };
  });

  return params;
}

const getFutureEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events?in=nl", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

const getPastEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events/past?in=nl", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

const getAllEvents = async () => {
  const futureEvents: Event[] = await getFutureEvents();
  const pastEvents: Event[] = await getPastEvents();
  const events: Event[] = [...pastEvents, ...futureEvents];

  return events;
};

const getEventDetail = async (id: string) => {
  if (!id) return null;
  let eventDetail: EventDetail | null = null;

  try {
    const baseUrl = env.BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/event/${id}`, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    if (response.status !== 200) {
      return notFound();
    }

    eventDetail = await response.json();
  } catch (error) {
    console.error("Error fetching event detail:", error);
    return notFound();
  }

  return eventDetail;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const raw = await params;

  if (!raw) return notFound();

  const id = raw?.slug?.[1];

  if (!id) return notFound();

  const eventDetail = await getEventDetail(id);
  if (!eventDetail) return notFound();

  const events: Event[] = await getAllEvents();
  const eventClasses: EventClass[] = events.map(
    (event) => new EventClass(event)
  );

  const event = eventClasses.find((event) => event.id === id);
  if (!event) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/events`}>
        <ArrowLeft />
      </Link>

      <Title size="h1" title={event.name} subTitle={event.location?.short} />

      <div className="h-full w-full col-span-1">
        <div className="flex flex-col gap-6">
          <p>
            <strong>{event.date.human}</strong>
          </p>

          <MarkdownWrapper>{eventDetail.description}</MarkdownWrapper>

          <p>
            <strong>Created by: </strong>
            <Link
              href={`https://www.openstreetmap.org/user/${eventDetail.creator}`}
              target="_blank"
            >
              {eventDetail.creator}
            </Link>
          </p>

          {eventDetail.attendees.length > 0 && (
            <p>
              <strong>Attendees: </strong>{" "}
              {eventDetail.attendees.map((attendee, i) => (
                <span key={attendee}>
                  <Link
                    href={`https://www.openstreetmap.org/user/${attendee}`}
                    target="_blank"
                  >
                    {attendee}
                  </Link>
                  {i < eventDetail.attendees.length - 2 && ", "}
                  {i === eventDetail.attendees.length - 2 && ", and "}
                </span>
              ))}
            </p>
          )}

          {eventDetail.website && (
            <div className="flex justify-center">
              <ExternalButton href={eventDetail.website}>
                Event website
              </ExternalButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
