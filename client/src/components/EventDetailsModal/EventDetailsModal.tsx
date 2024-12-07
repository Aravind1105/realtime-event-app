import React from "react";
import "./EventDetailsModal.css";
import { UserRole } from "types/types";

interface EventDetailsModalProps {
  event: any;
  onClose: () => void;
  onCancel: (eventId: number) => void;
  onHandleClick: (eventId: number) => void;
  isJoined: boolean;
  userInfo: { userRole: string; userName: string };
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onCancel,
  onHandleClick,
  isJoined,
  userInfo: { userRole, userName },
}) => {
  const formatDateTime = (dateTime: string) =>
    new Date(dateTime).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const renderJoiners = () =>
    event?.joiners?.length ? event?.joiners?.join(", ") : "None";

  const renderActionButton = () => {
    if (
      userRole === UserRole.CREATOR &&
      event?.organizer === userName &&
      !event?.isCancelled
    ) {
      return (
        <button
          className="btn-selection cancel-btn"
          onClick={() => onCancel(event?.id)}
        >
          Cancel Event
        </button>
      );
    }

    return (
      <>
        {isJoined && (
          <p className="change-mind-text">Changed your mind? Click below</p>
        )}
        <button
          className={`btn-selection ${isJoined ? "unjoin-btn" : "join-btn"}`}
          onClick={() => onHandleClick(event?.id)}
        >
          {isJoined ? "Unjoin" : "Join"}
        </button>
      </>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <div className="modal-header">
          <h2>{event?.title}</h2>
        </div>
        <div className="modal-body">
          <div className="event-info">
            <p>
              <strong>Organizer:</strong> {event?.organizer}
            </p>
            <p>
              <strong>Date:</strong> {formatDateTime(event?.date_time)}
            </p>
            <p>
              <strong>Duration:</strong> {event?.duration} hour(s)
            </p>
            <p>
              <strong>Location:</strong> {event?.location}
            </p>
            <p>
              <strong>Message:</strong>{" "}
              {event?.message || "No message provided..."}
            </p>
          </div>

          <div className="joiners">
            <p>
              <strong>Joiners:</strong> {renderJoiners()}
            </p>
            {isJoined && (
              <p className="going-message">
                🎉 Cool, You've secured your spot! 🎉
              </p>
            )}
          </div>

          <div className="action-btns">{renderActionButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
