import React, { useState, useEffect } from "react";

interface User {
  name: string;
  username: string;
}

interface UserFormProps {
  onAddUser: (user: User) => void;
  onEditUser: (user: User, index: number) => void;
  editIndex: number | null;
  users: User[];
}

function UserForm({ onAddUser, onEditUser, editIndex, users }: UserFormProps) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const isEditing = editIndex !== null;
  const buttonText = isEditing ? "Update" : "Add";

  useEffect(() => {
    if (isEditing) {
      const userToEdit = users[editIndex];
      setName(userToEdit.name);
      setUserName(userToEdit.username);
    }
  }, [isEditing, editIndex, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && username) {
      const newUser = { name, username };
      if (isEditing) {
        onEditUser(newUser, editIndex as number);
      } else {
        onAddUser(newUser);
      }
      setName("");
      setUserName("");
    }
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your Name"
      />
      <br />
      <input
        className="form-control"
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your User Name"
      />
      <br />
      <button className="btn btn-outline-success " type="submit">
        {buttonText}
      </button>
      <br />
      <hr />
    </form>
  );
}

export default UserForm;
