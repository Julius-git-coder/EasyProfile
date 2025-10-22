// import React, { useState } from "react";
// import {
//   Settings,
//   Shield,
//   AlertTriangle,
//   Trash2,
//   UsersIcon,
//   Camera,
//   Check,
//   Activity,
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

// const Administrator = ({ users = [], onDeleteAllUsers }) => {
//   const [showDangerZone, setShowDangerZone] = useState(false);
//   const [confirmText, setConfirmText] = useState("");
//   const [settings, setSettings] = useState({
//     allowPublicRegistration: true,
//     requireEmailVerification: false,
//     enableProfileImages: true,
//     maxUsers: 1000,
//     autoApproveUsers: true,
//     enableNotifications: true,
//   });

//   const handleSettingsChange = (key, value) => {
//     setSettings((prev) => ({ ...prev, [key]: value }));
//   };

//   const systemStats = {
//     totalUsers: users.length,
//     usersWithImages: users.filter((u) => u.profileImage).length,
//     usersWithCompleteProfiles: users.filter(
//       (u) => u.name && u.email && u.phone && u.position && u.bio
//     ).length,
//     averageProfileCompletion:
//       users.length > 0
//         ? Math.round(
//             users.reduce((acc, user) => {
//               const fields = Object.values(user).filter(
//                 (v) => v && v.toString().trim()
//               ).length;
//               return acc + (fields / 10) * 100;
//             }, 0) / users.length
//           )
//         : 0,
//   };

//   const handleDeleteAll = () => {
//     if (confirmText === "DELETE ALL USERS" && onDeleteAllUsers) {
//       onDeleteAllUsers();
//       setShowDangerZone(false);
//       setConfirmText("");
//     }
//   };

//   const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
//     <button
//       onClick={() => !disabled && onChange(!checked)}
//       disabled={disabled}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//         checked ? "bg-indigo-600" : "bg-slate-300"
//       } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//           checked ? "translate-x-6" : "translate-x-1"
//         }`}
//       />
//     </button>
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold text-slate-800">Administrator</h2>
//           <p className="text-slate-600">System settings and management</p>
//         </div>
//         <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
//           <Shield className="w-4 h-4" />
//           Admin Access
//         </div>
//       </div>

//       {/* System Overview */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="bg-gradient-to-br from-slate-600 to-slate-700 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-slate-300">Total Users</p>
//                 <p className="text-2xl font-bold">{systemStats.totalUsers}</p>
//               </div>
//               <UsersIcon className="w-6 h-6 text-slate-400" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100">With Images</p>
//                 <p className="text-2xl font-bold">
//                   {systemStats.usersWithImages}
//                 </p>
//               </div>
//               <Camera className="w-6 h-6 text-blue-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100">Complete Profiles</p>
//                 <p className="text-2xl font-bold">
//                   {systemStats.usersWithCompleteProfiles}
//                 </p>
//               </div>
//               <Check className="w-6 h-6 text-green-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100">Avg Completion</p>
//                 <p className="text-2xl font-bold">
//                   {systemStats.averageProfileCompletion}%
//                 </p>
//               </div>
//               <Activity className="w-6 h-6 text-purple-200" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* System Settings */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Settings className="w-5 h-5" />
//             System Settings
//           </CardTitle>
//           <CardDescription>
//             Configure system behavior and permissions
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-medium text-slate-800">
//                       Public Registration
//                     </h4>
//                     <p className="text-sm text-slate-600">
//                       Allow users to register without admin approval
//                     </p>
//                   </div>
//                   <ToggleSwitch
//                     checked={settings.allowPublicRegistration}
//                     onChange={(value) =>
//                       handleSettingsChange("allowPublicRegistration", value)
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-medium text-slate-800">
//                       Email Verification
//                     </h4>
//                     <p className="text-sm text-slate-600">
//                       Require email verification for new users
//                     </p>
//                   </div>
//                   <ToggleSwitch
//                     checked={settings.requireEmailVerification}
//                     onChange={(value) =>
//                       handleSettingsChange("requireEmailVerification", value)
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-medium text-slate-800">
//                       Profile Images
//                     </h4>
//                     <p className="text-sm text-slate-600">
//                       Enable profile image uploads
//                     </p>
//                   </div>
//                   <ToggleSwitch
//                     checked={settings.enableProfileImages}
//                     onChange={(value) =>
//                       handleSettingsChange("enableProfileImages", value)
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-medium text-slate-800">Auto Approve</h4>
//                     <p className="text-sm text-slate-600">
//                       Automatically approve new user registrations
//                     </p>
//                   </div>
//                   <ToggleSwitch
//                     checked={settings.autoApproveUsers}
//                     onChange={(value) =>
//                       handleSettingsChange("autoApproveUsers", value)
//                     }
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-medium text-slate-800">
//                       Notifications
//                     </h4>
//                     <p className="text-sm text-slate-600">
//                       Enable system notifications
//                     </p>
//                   </div>
//                   <ToggleSwitch
//                     checked={settings.enableNotifications}
//                     onChange={(value) =>
//                       handleSettingsChange("enableNotifications", value)
//                     }
//                   />
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-medium text-slate-800 mb-2">
//                   Maximum Users
//                 </h4>
//                 <input
//                   type="number"
//                   value={settings.maxUsers}
//                   onChange={(e) =>
//                     handleSettingsChange(
//                       "maxUsers",
//                       parseInt(e.target.value) || 0
//                     )
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//                   min="1"
//                   max="10000"
//                 />
//                 <p className="text-sm text-slate-600 mt-1">
//                   Current: {systemStats.totalUsers} / {settings.maxUsers}
//                 </p>

//                 {/* Progress bar for user limit */}
//                 <div className="mt-2">
//                   <div className="w-full bg-slate-200 rounded-full h-2">
//                     <div
//                       className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
//                       style={{
//                         width: `${Math.min(
//                           (systemStats.totalUsers / settings.maxUsers) * 100,
//                           100
//                         )}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* System Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Activity className="w-5 h-5" />
//             System Actions
//           </CardTitle>
//           <CardDescription>Perform administrative actions</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <Button className="flex-1" size="lg">
//                 <UsersIcon className="w-5 h-5 mr-2" />
//                 Export Users
//               </Button>
//               <Button variant="outline" className="flex-1" size="lg">
//                 <Activity className="w-5 h-5 mr-2" />
//                 System Backup
//               </Button>
//               <Button variant="outline" className="flex-1" size="lg">
//                 <Settings className="w-5 h-5 mr-2" />
//                 Generate Report
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Danger Zone */}
//       <Card className="border-red-200">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-red-600">
//             <AlertTriangle className="w-5 h-5" />
//             Danger Zone
//           </CardTitle>
//           <CardDescription>
//             Irreversible and destructive actions
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//               <h4 className="font-medium text-red-800 mb-2">
//                 Delete All Users
//               </h4>
//               <p className="text-sm text-red-600 mb-4">
//                 This will permanently delete all users from the system. This
//                 action cannot be undone.
//               </p>

//               {!showDangerZone ? (
//                 <Button
//                   variant="destructive"
//                   onClick={() => setShowDangerZone(true)}
//                   disabled={systemStats.totalUsers === 0}
//                 >
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete All Users
//                 </Button>
//               ) : (
//                 <div className="space-y-3">
//                   <p className="text-sm text-red-700 font-medium">
//                     Type "DELETE ALL USERS" to confirm:
//                   </p>
//                   <input
//                     type="text"
//                     value={confirmText}
//                     onChange={(e) => setConfirmText(e.target.value)}
//                     className="w-full px-3 py-2 border border-red-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
//                     placeholder="DELETE ALL USERS"
//                   />
//                   <div className="flex gap-2">
//                     <Button
//                       variant="destructive"
//                       onClick={handleDeleteAll}
//                       disabled={confirmText !== "DELETE ALL USERS"}
//                       className="flex-1"
//                     >
//                       Confirm Delete All
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setShowDangerZone(false);
//                         setConfirmText("");
//                       }}
//                       className="flex-1"
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Administrator;
import Button from "./Button";

const Administrator = ({ users, onDeleteAllUsers }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Administrator</h2>
      <p className="text-slate-600 mb-4">Total Users: {users.length}</p>
      <Button
        onClick={onDeleteAllUsers}
        variant="destructive"
        disabled={users.length === 0}
      >
        Delete All Users
      </Button>
    </div>
  );
};

export default Administrator;