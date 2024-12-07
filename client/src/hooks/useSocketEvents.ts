import { useEffect, useState } from "react";
import { EventProps, SocketResponse } from "types/types";
import { io } from "socket.io-client";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return socket;
};

export const useSocketEvents = (
  socket: any,
  setEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
) => {
  useEffect(() => {
    if (socket) {
      const updateEventList = (
        data: SocketResponse,
        updater: (event: EventProps) => EventProps
      ) => {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === data.event_id ? updater(event) : event
          )
        );
      };

      socket.on("event_created", (event: EventProps) => {
        setEvents((prev) => [...prev, event]);
      });

      socket.on("user_joined", (data: SocketResponse) => {
        updateEventList(data, (event) => ({ ...event, joiners: data.joiners }));
      });

      socket.on("user_undo_joined", (data: SocketResponse) => {
        updateEventList(data, (event) => ({ ...event, joiners: data.joiners }));
      });

      socket.on("event_cancelled", (data: SocketResponse) => {
        updateEventList(data, (event) => ({ ...event, isCancelled: true }));
      });

      return () => {
        socket.off("event_created");
        socket.off("user_joined");
        socket.off("user_undo_joined");
        socket.off("event_cancelled");
      };
    }
  }, [socket, setEvents]);
};
