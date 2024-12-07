import React, { useState } from "react";
import { EventProps } from "types/types";
import "./CreateEventModal.css";

interface EventFormProps {
  onCreate: (event: EventProps) => void;
  onClose: () => void;
}

const CreateEventModal: React.FC<EventFormProps> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    organizer: localStorage.getItem("name").toLowerCase(),
    date_time: "",
    duration: 0,
    location: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_time">Date & Time:</label>
            <div className="date-time-picker">
              <input
                type="datetime-local"
                id="date_time"
                name="date_time"
                value={formData.date_time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (hours):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message: </label>
            <textarea
              id="message"
              name="message"
              placeholder="Add a message to your joiners"
              value={formData.message}
              onChange={handleInputChange}
              className="message-input"
            ></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
