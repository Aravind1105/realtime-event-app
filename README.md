## Project Structure

The Real-Time Events App is a web-based platform for managing events in real time. It allows users to create, join, and cancel events, with updates provided instantly through Socket.IO. The backend is built using FastAPI, while the frontend uses React for the user interface. This app provides a seamless experience for both event organizers (Creators) and attendees (Joiners) with real-time communication.

Key Features Implemented:

1. User Roles (Creator and Joiner):
- Users can log in as either a Creator or a Joiner. Creators have the ability to create and cancel events, while Joiners can view and join events.
- The decision to include user roles was based on providing clear responsibilities: Creators manage events, and Joiners participate.

2. Event Creation and Display:
- Creators can create events by filling out a form with event details like title, date, duration, and location. These events are displayed for all users to view.
- This feature was designed to ensure a clear separation of roles and to give users control over event management.

3. Join/Unjoin Events:
- Joiners can join or unjoin events at any time. The app updates in real-time to reflect these changes using Socket.IO.
- The use of Socket.IO allows for seamless real-time updates without needing to refresh the page, offering a better user experience.

4. Event Cancellation:
- Creators can cancel events. Once an event is canceled, all users are notified in real-time.
- The decision to allow event cancellation was made to ensure that event organizers could maintain control over their events, especially in cases where an event may no longer be feasible or needs to be rescheduled.

5. Real-Time Updates with Socket.IO:
- Socket.IO was used for real-time updates between the frontend (React) and backend (FastAPI). Socket.IO enables instant communication between the server and all connected clients, ensuring real-time event status updates (e.g., when a user joins, unjoins, or when an event is canceled).
- We opted for Socket.IO because it provides a simple, scalable, and efficient solution for managing WebSocket connections, including automatic reconnection, broadcasting, and easy integration with both the frontend and backend.

6. Data Storage:
- The app uses an in-memory data store to hold event data and user participation information. This was chosen for simplicity and speed in development.
- In a future iteration, this could be replaced with a persistent database to maintain data across sessions and server restarts.
- Local Storage was used to store user details (role and name) for simplicity. This was done to avoid the complexity of implementing a full authentication system, as the focus was on real-time event management. Roles were managed via the frontend state and stored in localStorage, making it easy to switch between Creator and Joiner roles.
