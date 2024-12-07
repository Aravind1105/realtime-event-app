import { useEffect, useState } from "react";
import { EventProps, UserRole } from "types/types";
import { getEvents } from "services/api";

const useFetchEvents = (userName: string | null, userRole: UserRole | null) => {
  const [events, setEvents] = useState<EventProps[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (userRole) {
        const data: EventProps[] = await getEvents();
        setEvents(
          userRole === UserRole.CREATOR
            ? data.filter(
                (event) => event.organizer === userName?.toLowerCase()
              )
            : data
        );
      }
    };

    fetchEvents();
  }, [userName, userRole]);

  return [events, setEvents] as const;
};

export default useFetchEvents;
