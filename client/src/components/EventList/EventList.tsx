import React from "react";
import EventCard from "../EventCard/EventCard";
import { EventProps } from "types/types";
import "./EventList.css";

export interface EventListProps {
  events: EventProps[];
  onJoin: (eventId: number) => void;
  onUndoJoin: (eventId: number) => void;
  onCancel: (eventId: number) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onJoin,
  onUndoJoin,
  onCancel,
}) => {
  return (
    <div className="event-list">
      {events?.map((event) => (
        <EventCard
          key={event?.id}
          event={event}
          onJoin={onJoin}
          onUndoJoin={onUndoJoin}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default EventList;
