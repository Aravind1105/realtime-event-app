import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserRole } from "types/types";
import "./LoginPage.css";

const LoginPage = () => {
  const [user, setUser] = useState<User>({ role: "" as UserRole, name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage on component mount
    localStorage.clear();
  }, []);

  const handleLogin = () => {
    if (user?.role && user?.name) {
      // Save user data to local storage
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      navigate("/events");
    }
  };

  const updateUser = (key: keyof User, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  return (
    <div className="login-page">
      <h1>Get Started</h1>
      {!user?.role ? (
        <div className="role-buttons">
          <button onClick={() => updateUser("role", UserRole.CREATOR)}>
            Login as Creator
          </button>
          <button onClick={() => updateUser("role", UserRole.JOINER)}>
            Login as Joiner
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            handleLogin();
          }}
          className="login-form"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={user?.name}
            onChange={(e) => updateUser("name", e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Continue
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
