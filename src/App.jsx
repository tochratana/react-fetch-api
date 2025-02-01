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
      <h1 className="my-5">GitHub User Cards</h1>

      <div class="relative w-[80vh] m-auto">
        <label for="Search" class="sr-only">
          {" "}
          Search{" "}
        </label>

        <input
          type="text"
          laceholder="Search for a user..."
          value={searchTerm}
          onChange={handleSearchChange}
          class=" rounded-md w-full border-2 border-black px-5 py-2.5 pe-10 shadow-xs sm:text-sm"
        />

        <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" class="text-gray-600 hover:text-gray-700">
            <span class="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
      <div className="grid grid-cols-4 gap-10 px-20 py-10">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
