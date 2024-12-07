# Real-Time Events App

This is a real-time event management application where users can create, join, or cancel events. It uses FastAPI for the backend and React for the frontend. The app supports real-time updates using Socket.IO.

## Key Features:
Login as Creator or Joiner: Users can log in as either an event creator or a joiner.
Event Creation: Creators can create events by entering event details.
Join/Unjoin Events: Joiners can join or unjoin events dynamically.
Event Details Modal: Users can view event details in a modal.
Real-Time Updates: Event details update in real time through Socket.IO.

## Available Scripts

In the project directory, you can go inside /client to run frontend:

### `npm install`

Installs the required dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


In the project directory, you can gp inside /server to run backend:

Create a virtual environment:

### `python3 -m venv venv`
### `source venv/bin/activate`  

Install dependencies:

### `python3 -m pip install -r requirements.txt`

Run the server:

### `uvicorn app:socket_app --reload`

Open [http://localhost:8000](http://localhost:8000).

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
