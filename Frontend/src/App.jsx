import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      setName("");
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Storage App</h1>

      <form onSubmit={saveUser}>
        <input
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>

      <div className="users">
        {users.map((user) => (
          <p key={user._id}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;