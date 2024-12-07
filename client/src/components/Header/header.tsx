import React from "react";
import "./header.css";
import { UserRole } from "types/types";

interface HeaderProps {
  userName: string;
  userRole: UserRole;
  onCreate: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole, onCreate }) => {
  return (
    <header className="header">
      <div className="logo">🎉 Eventify</div>
      <div className="welcome">Welcome, {userName}!</div>
      {userRole === UserRole.CREATOR && (
        <button className="create-event-btn" onClick={onCreate}>
          Create Event
        </button>
      )}
    </header>
  );
};

export default Header;
