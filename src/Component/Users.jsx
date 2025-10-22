// import React, { useState, useEffect } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   Search,
//   Edit,
//   Eye,
//   Trash2,
//   Users as UsersIcon,
// } from "lucide-react";

// // Custom Button component
// const Button = ({
//   children,
//   onClick,
//   disabled,
//   variant = "default",
//   size = "default",
//   className = "",
//   ...props
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

//   const variants = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
//     ghost: "hover:bg-gray-100 text-gray-900",
//     destructive: "bg-red-600 text-white hover:bg-red-700",
//   };

//   const sizes = {
//     default: "h-10 py-2 px-4",
//     sm: "h-8 px-3 text-sm",
//     lg: "h-12 px-8",
//   };

//   return (
//     <button
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// // Custom Card components
// const Card = ({ children, className = "" }) => (
//   <div
//     className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
//   >
//     {children}
//   </div>
// );

// const CardHeader = ({ children, className = "" }) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
// );

// const CardTitle = ({ children, className = "" }) => (
//   <h3
//     className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
//   >
//     {children}
//   </h3>
// );

// const CardDescription = ({ children, className = "" }) => (
//   <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
// );

// const CardContent = ({ children, className = "" }) => (
//   <div className={`p-6 pt-0 ${className}`}>{children}</div>
// );

// const Users = ({ users = [], onEditUser, onViewUser, onDeleteUser }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(users);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const filtered = users.filter(
//         (user) =>
//           user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (user.position &&
//             user.position.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//       setFilteredUsers(filtered);
//     } else {
//       setFilteredUsers(users);
//     }
//   }, [searchQuery, users]);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold text-slate-800">Users</h2>
//           <p className="text-slate-600">Manage all registered users</p>
//         </div>
//         <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
//           {users.length} Total Users
//         </div>
//       </div>

//       {/* Search Bar */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search users by name, email, or position..."
//               className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredUsers.map((user) => (
//           <Card key={user.id} className="hover:shadow-lg transition-all">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 {user.profileImage ? (
//                   <img
//                     src={user.profileImage}
//                     alt={user.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                     {user.name ? user.name.charAt(0).toUpperCase() : "?"}
//                   </div>
//                 )}
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-slate-800">{user.name}</h3>
//                   <p className="text-sm text-slate-600">
//                     {user.position || "No position"}
//                   </p>
//                   {user.experience && (
//                     <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
//                       {user.experience.charAt(0).toUpperCase() +
//                         user.experience.slice(1)}{" "}
//                       Level
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center gap-2 text-sm text-slate-600">
//                   <Mail className="w-4 h-4" />
//                   {user.email}
//                 </div>
//                 {user.phone && (
//                   <div className="flex items-center gap-2 text-sm text-slate-600">
//                     <Phone className="w-4 h-4" />
//                     {user.phone}
//                   </div>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => onViewUser && onViewUser(user)}
//                   className="flex-1"
//                 >
//                   <Eye className="w-3 h-3 mr-1" />
//                   View
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={() => onEditUser && onEditUser(user)}
//                   className="flex-1"
//                 >
//                   <Edit className="w-3 h-3 mr-1" />
//                   Edit
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => onDeleteUser && onDeleteUser(user)}
//                   className="flex-1"
//                 >
//                   <Trash2 className="w-3 h-3 mr-1" />
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredUsers.length === 0 && (
//         <Card>
//           <CardContent className="p-12 text-center">
//             <UsersIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-slate-800 mb-2">
//               No users found
//             </h3>
//             <p className="text-slate-600">
//               {searchQuery
//                 ? "Try adjusting your search criteria"
//                 : "Start by adding your first user"}
//             </p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Users;

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