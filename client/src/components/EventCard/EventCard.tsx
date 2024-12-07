import React, { useState } from "react";
import { EventProps, UserRole } from "types/types";
import "./EventCard.css";
import EventDetailsModal from "components/EventDetailsModal/EventDetailsModal";

interface EventCardProps {
  event: EventProps;
  onJoin: (eventId: number) => void;
  onUndoJoin: (eventId: number) => void;
  onCancel: (eventId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onJoin,
  onUndoJoin,
  onCancel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userRole = localStorage.getItem("role") as UserRole;
  const userName = localStorage.getItem("name")?.toLowerCase();
  const isJoined = event?.joiners?.includes(userName);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  const renderEventDate = (date: string) =>
    new Date(date).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <>
      <div className={`event-card ${event?.isCancelled ? "cancelled" : ""}`}>
        <div className="card-header">
          <span className="joiner-count">
            <i className="user-icon">👤</i> {event?.joiners?.length || 0}
          </span>
        </div>

        <h3>{event?.title}</h3>

        <p>
          <b>Organizer:</b> {event?.organizer}
        </p>
        <p>
          <b>Date:</b> {renderEventDate(event?.date_time)}
        </p>
        <p>
          <b>Location:</b> {event?.location}
        </p>

        <p className="more-info" onClick={handleModalToggle}>
          Click here for more Info...
        </p>

        {userRole === UserRole.JOINER && isJoined && (
          <div className="joined-status">
            <span className="green-tick">✔</span> You're signed up!
          </div>
        )}
      </div>

      {isModalOpen && (
        <EventDetailsModal
          event={event}
          onClose={handleModalToggle}
          onCancel={(eventId) => {
            onCancel(eventId);
            handleModalToggle();
          }}
          onHandleClick={(eventId) =>
            isJoined ? onUndoJoin(eventId) : onJoin(eventId)
          }
          userInfo={{ userRole, userName }}
          isJoined={isJoined}
        />
      )}
    </>
  );
};

export default EventCard;
