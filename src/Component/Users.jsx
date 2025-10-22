
import { useState } from "react";
import Button from "./Button";

const Users = ({ users, onEditUser, onViewUser, onDeleteUser }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    ["name", "email", "position"].some((field) =>
      user[field]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Users</h2>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or position..."
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
        />
      </div>
      {filteredUsers.length === 0 ? (
        <p className="text-slate-600">
          {searchQuery
            ? "No users found matching your search."
            : "No users found."}
        </p>
      ) : (
        filteredUsers.map((user) => (
          <div key={user.id} className="mb-4 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-slate-800">{user.name}</h3>
            <p className="text-slate-600">{user.email}</p>
            <p className="text-slate-600">{user.position}</p>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => onViewUser(user)}>View</Button>
              <Button onClick={() => onEditUser(user)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDeleteUser(user)}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;