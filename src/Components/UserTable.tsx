import React from "react";

interface User {
  name: string;
  username: string;
}

interface UserTableProps {
  users: User[];
  onEditUser: (index: number) => void;
  onDeleteUser: (index: number) => void;
}

function UserTable({ users, onEditUser, onDeleteUser }: UserTableProps) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>User Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            {user.name !== "" && user.username !== null ? (
              <td className="d-flex justify-content-around">
                <button
                  className="btn btn-outline-warning btn-sm "
                  onClick={() => onEditUser(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDeleteUser(index)}
                >
                  Delete
                </button>
              </td>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
