import sys
import os
import pytest
from httpx import AsyncClient, ASGITransport
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app

@pytest.mark.asyncio
async def test_create_event():
    """
    Test the creation of an event.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Event data to create
        event_data = {
            "title": "Tech Conference 2024",
            "organizer": "John Doe",
            "date_time": "2024-12-10T10:00:00",
            "duration": 2,
            "location": "Downtown Convention Center, Seattle, WA",
            "message": "Join us for the largest tech conference of the year!",
        }

        # Send POST request to create an event
        response = await client.post("/events", json=event_data)
        assert response.status_code == 200
        created_event = response.json()

        # Validate the event details
        assert created_event["title"] == event_data["title"]
        assert created_event["organizer"] == event_data["organizer"]
        assert created_event["date_time"] == event_data["date_time"]
        assert created_event["duration"] == event_data["duration"]
        assert created_event["location"] == event_data["location"]
        assert created_event["message"] == event_data["message"]
        assert created_event["joiners"] == []
        assert not created_event["isCancelled"]


@pytest.mark.asyncio
async def test_join_event():
    """
    Test joining an event.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # First, create an event
        event_data = {
            "title": "Photography Workshop",
            "organizer": "Jane Smith",
            "date_time": "2024-12-15T14:00:00",
            "duration": 3,
            "location": "Art Studio, Downtown Denver, CO",
            "message": "Learn the basics of photography with hands-on activities!",
        }
        create_response = await client.post("/events", json=event_data)
        assert create_response.status_code == 200
        event_id = create_response.json()["id"]

        # Join the event
        join_response = await client.post(f"/events/{event_id}/join",params={"user": "Alice"})
        assert join_response.status_code == 200
        assert join_response.json()["message"] == "Alice joined the event."

        # Verify that the joiners list contains the user
        get_events_response = await client.get("/events")
        assert get_events_response.status_code == 200
        events = get_events_response.json()
        event = next((e for e in events if e["id"] == event_id), None)
        assert event is not None
        assert "Alice" in event["joiners"]
