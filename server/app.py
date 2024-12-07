from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from socketio import AsyncServer, ASGIApp
from pydantic import BaseModel
import uuid

# Initialize FastAPI and Socket.IO
app = FastAPI()
sio = AsyncServer(async_mode="asgi", cors_allowed_origins="*")
socket_app = ASGIApp(sio, app)
app.add_middleware(CORSMiddleware, allow_origins=["*"],  allow_methods=["*"], allow_headers=["*"])

# In-memory data store
events = []

class EventCreate(BaseModel):
    title: str
    organizer: str
    date_time: str
    duration: int
    location: str
    message: str

@app.post("/events")
async def create_event(event: EventCreate):
    event_id = str(uuid.uuid4())
    new_event = {
        "id": event_id,
        "title": event.title,
        "organizer": event.organizer,
        "date_time": event.date_time,
        "duration": event.duration,
        "location": event.location,
        "message": event.message,
        "joiners": [],
        "isCancelled": False,
    }
    events.append(new_event)
    await sio.emit("event_created", new_event)
    return new_event

@app.get("/events")
async def get_events():
    return events

@app.post("/events/{event_id}/join")
async def join_event(event_id: str, user: str):
    event = next((event for event in events if event["id"] == event_id), None)
    if not event or event["isCancelled"]:
        raise HTTPException(status_code=404, detail="Event not found or cancelled")
    event["joiners"].append(user)
    await sio.emit("user_joined", {"event_id": event_id, "joiners": event["joiners"]})
    return {"message": f"{user} joined the event."}

@app.post("/events/{event_id}/undo_join")
async def undo_join_event(event_id: str, user: str):
    event = next((event for event in events if event["id"] == event_id), None)
    if not event or event["isCancelled"]:
        raise HTTPException(status_code=404, detail="Event not found or cancelled")
    if user in event["joiners"]:
        event["joiners"].remove(user)
        await sio.emit("user_undo_joined", {"event_id": event_id, "joiners": event["joiners"]})
        return {"message": f"{user} left the event."}
    raise HTTPException(status_code=400, detail="User not part of the event.")

@app.delete("/events/{event_id}")
async def cancel_event(event_id: str):
    event = next((event for event in events if event["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    event["isCancelled"] = True
    await sio.emit("event_cancelled", {"event_id": event_id})
    return {"message": "Event cancelled"}

