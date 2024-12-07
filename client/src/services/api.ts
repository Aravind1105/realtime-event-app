import { EventProps } from "types/types";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const getEvents = async () => {
  const response = await fetch(`${BASE_URL}/events`);
  return response.json();
};

export const createEvent = async (event: EventProps) => {
  const queryParams = new URLSearchParams({
    user: localStorage.getItem("name").toLowerCase(),
  });
  const response = await fetch(`${BASE_URL}/events?${queryParams}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return response.json();
};

export const joinEvent = async (eventId: string) => {
  const queryParams = new URLSearchParams({
    user: localStorage.getItem("name").toLowerCase(),
  });
  const response = await fetch(
    `${BASE_URL}/events/${eventId}/join?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const undoJoinEvent = async (eventId: string) => {
  const queryParams = new URLSearchParams({
    user: localStorage.getItem("name").toLowerCase(),
  });
  const response = await fetch(
    `${BASE_URL}/events/${eventId}/undo_join?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const cancelEvent = async (eventId: string) => {
  const response = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
