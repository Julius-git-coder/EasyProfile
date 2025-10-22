// import React from "react";
// import {
//   UsersIcon,
//   Activity,
//   TrendingUp,
//   Clock,
//   BarChart3,
//   Briefcase,
// } from "lucide-react";

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

// const Dashboard = ({ users = [] }) => {
//   const totalUsers = users.length;
//   const recentUsers = users.slice(-5).reverse();
//   const experienceLevels = users.reduce((acc, user) => {
//     if (user.experience) {
//       acc[user.experience] = (acc[user.experience] || 0) + 1;
//     }
//     return acc;
//   }, {});

//   const positionCounts = users.reduce((acc, user) => {
//     if (user.position) {
//       acc[user.position] = (acc[user.position] || 0) + 1;
//     }
//     return acc;
//   }, {});

//   const topPositions = Object.entries(positionCounts)
//     .sort(([, a], [, b]) => b - a)
//     .slice(0, 5);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
//         <p className="text-slate-600">
//           Overview of your user management system
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100">Total Users</p>
//                 <p className="text-3xl font-bold">{totalUsers}</p>
//               </div>
//               <UsersIcon className="w-8 h-8 text-blue-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100">Active Profiles</p>
//                 <p className="text-3xl font-bold">{totalUsers}</p>
//               </div>
//               <Activity className="w-8 h-8 text-green-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100">Senior Level</p>
//                 <p className="text-3xl font-bold">
//                   {experienceLevels.senior || 0}
//                 </p>
//               </div>
//               <TrendingUp className="w-8 h-8 text-purple-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-orange-100">New This Week</p>
//                 <p className="text-3xl font-bold">{recentUsers.length}</p>
//               </div>
//               <Clock className="w-8 h-8 text-orange-200" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Recent Users */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Clock className="w-5 h-5" />
//               Recent Users
//             </CardTitle>
//             <CardDescription>Latest user registrations</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentUsers.length > 0 ? (
//                 recentUsers.map((user) => (
//                   <div
//                     key={user.id}
//                     className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
//                   >
//                     {user.profileImage ? (
//                       <img
//                         src={user.profileImage}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                         {user.name ? user.name.charAt(0).toUpperCase() : "?"}
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <p className="font-medium text-slate-800">{user.name}</p>
//                       <p className="text-sm text-slate-600">{user.position}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-slate-500 text-center py-4">No users yet</p>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Experience Levels */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BarChart3 className="w-5 h-5" />
//               Experience Distribution
//             </CardTitle>
//             <CardDescription>User experience levels breakdown</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {Object.entries(experienceLevels).map(([level, count]) => (
//                 <div key={level} className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-slate-700 capitalize">
//                     {level} Level
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <div className="w-24 bg-slate-200 rounded-full h-2">
//                       <div
//                         className="bg-indigo-500 h-2 rounded-full"
//                         style={{
//                           width: `${
//                             totalUsers > 0 ? (count / totalUsers) * 100 : 0
//                           }%`,
//                         }}
//                       />
//                     </div>
//                     <span className="text-sm text-slate-600 w-8 text-right">
//                       {count}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//               {Object.keys(experienceLevels).length === 0 && (
//                 <p className="text-slate-500 text-center py-4">
//                   No data available
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Top Positions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Briefcase className="w-5 h-5" />
//             Popular Positions
//           </CardTitle>
//           <CardDescription>
//             Most common job positions in your system
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {topPositions.length > 0 ? (
//               topPositions.map(([position, count]) => (
//                 <div key={position} className="bg-slate-50 rounded-lg p-4">
//                   <h4 className="font-medium text-slate-800 mb-1">
//                     {position}
//                   </h4>
//                   <div className="flex items-center gap-2">
//                     <div className="text-2xl font-bold text-indigo-600">
//                       {count}
//                     </div>
//                     <div className="text-sm text-slate-600">
//                       {count === 1 ? "user" : "users"}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-8">
//                 <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500">No position data available</p>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;
const Dashboard = ({ users }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Dashboard</h2>
      <p className="text-slate-600">Total Users: {users.length}</p>
      {/* Add more dashboard content as needed */}
    </div>
  );
};

export default Dashboard;