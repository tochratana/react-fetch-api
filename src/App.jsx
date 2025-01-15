import React, { useState, useEffect } from "react";
import { UserCard } from "./components/UserCard";
import axios from "axios";
import "./index.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <div className="text-center">
      <h1>GitHub User Cards</h1>
      <input
        type="text"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border-2 border-black px-2 rounded-sm"
      />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
