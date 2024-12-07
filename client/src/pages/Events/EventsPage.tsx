import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "components/CreateEventModal/CreateEventModal";
import EventList from "components/EventList/EventList";
import { EventProps, UserRole } from "types/types";
import useFetchEvents from "hooks/useFetchEvents";
import { useSocket, useSocketEvents } from "hooks/useSocketEvents";
import {
  cancelEvent,
  createEvent,
  joinEvent,
  undoJoinEvent,
} from "services/api";
import Header from "components/Header/header";
import "./EventsPage.css";

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("name");
  const userRole = localStorage.getItem("role") as UserRole;

  if (!userName || !userRole) {
    navigate("/", { replace: true });
  }

  const [events, setEvents] = useFetchEvents(userName, userRole);
  const socket = useSocket(process.env.REACT_APP_BACKEND_URL);
  useSocketEvents(socket, setEvents);

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const handleCreate = async (event: EventProps) => {
    await createEvent(event);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header
        userName={userName}
        userRole={userRole}
        onCreate={handleToggleModal}
      />
      {isModalOpen && (
        <CreateEventModal onCreate={handleCreate} onClose={handleToggleModal} />
      )}
      {events.length > 0 ? (
        <EventList
          events={events}
          onJoin={(id) => joinEvent(id.toString())}
          onUndoJoin={(id) => undoJoinEvent(id.toString())}
          onCancel={(id) => cancelEvent(id.toString())}
        />
      ) : userRole === UserRole.CREATOR ? (
        <p className="no-events">
          No events found.{" "}
          <span onClick={handleToggleModal}>Create one to get started!</span>
        </p>
      ) : (
        <p className="no-events">
          No available events. Please check back later.
        </p>
      )}
    </>
  );
};

export default EventPage;
