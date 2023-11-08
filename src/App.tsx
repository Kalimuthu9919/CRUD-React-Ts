import React, { useEffect, useState } from "react";

import UserForm from "./Components/UserForm";
import UserTable from "./Components/UserTable";
import axios from "axios";

function App() {
  const [users, setUsers] = useState<{ name: string; username: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const handleAddUser = (user: { name: string; username: string }) => {
    axios
      .post(API_URL, user)
      .then((response) => {
        setUsers([...users, response.data]);
        console.log("Data uploaded successfully");
      })
      .catch((err) => {
        console.log("Failed to upload data", err);
      });
    setEditIndex(null);
  };
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleEditUser = (index: number) => {
    setEditIndex(index);
  };

  const handleUpdateUser = (
    user: { name: string; username: string },
    index: number
  ) => {
    axios.put(`${API_URL}/${users[index]}`, user);
    const updatedUsers = [...users];
    updatedUsers[index] = user;
    setUsers(updatedUsers);
    setEditIndex(null);
  };

  const handleDeleteUser = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-3 mr-4">
          <h2 className="mb-4">CRUD</h2>
          <UserForm
            onAddUser={handleAddUser}
            onEditUser={handleUpdateUser}
            editIndex={editIndex}
            users={users}
          />
        </div>
        <div className="col-md-6 mt-4 ml-4">
          <UserTable
            users={users}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
