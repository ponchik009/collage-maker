import React from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  const [room, setRoom] = React.useState("");

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoom(e.target.value);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/${room}`);
  };

  return (
    <form className="AppForm" onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Room name"
        value={room}
        onChange={handleRoomChange}
      />
      <button type="submit">Join</button>
    </form>
  );
};
