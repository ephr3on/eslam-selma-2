import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildGoogleCalendarUrl(event: {
  title: string;
  date: string;
  time: string;
  location: string;
  mapUrl?: string;
}) {
  const start = `${event.date}T${event.time}`;
  const end = `${event.date}T230000`;
  const params: Record<string, string> = {
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    location: event.location,
  };
  if (event.mapUrl) params.details = event.mapUrl;
  return `https://calendar.google.com/calendar/render?${new URLSearchParams(params).toString()}`;
}

export function generateICS(event: {
  title: string;
  date: string;
  time: string;
  location: string;
  mapUrl?: string;
}): string {
  const start = `${event.date}T${event.time}`;
  const end = `${event.date}T230000`;
  const escapedLocation = event.location.replace(/,/g, "\\,");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Eslam & Selma Wedding//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${escapedLocation}`,
    "UID:eslam-selma-wedding-20260911@invitation",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
  ];
  if (event.mapUrl) lines.push(`URL:${event.mapUrl}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
}
