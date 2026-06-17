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
}) {
  const start = `${event.date}T${event.time}`;
  const end = `${event.date}T210000`; // 9pm end
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
