// import React, { useState, useEffect, useRef } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Briefcase,
//   Plus,
//   X,
//   Check,
//   Upload,
//   Search,
//   Edit,
//   Camera,
//   Eye,
//   Trash2,
//   AlertTriangle,
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
//   };

//   const sizes = {
//     default: "h-10 py-2 px-4",
//     sm: "h-8 px-3 text-sm",
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

// // Mock store hook (replace with your actual useUsersStore)
// const useUsersStore = () => {
//   const [users, setUsers] = useState([]);

//   const addNewUser = (user) => {
//     const newUser = { ...user, id: Date.now().toString() };
//     setUsers((prev) => [...prev, newUser]);
//     console.log("🧾 User added:", newUser);
//   };

//   const editUser = (id, updatedUser) => {
//     setUsers((prev) =>
//       prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
//     );
//     console.log("✏️ User edited:", updatedUser);
//   };

//   const deleteUser = (id) => {
//     setUsers((prev) => prev.filter((user) => user.id !== id));
//     console.log("🗑️ User deleted:", id);
//   };

//   return { users, addNewUser, editUser, deleteUser };
// };

// export default function EnhancedForm() {
//   const { addNewUser, editUser, deleteUser, users } = useUsersStore();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     position: "",
//     experience: "",
//     skills: "",
//     bio: "",
//     profileImage: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     console.log("🧾 Current users:", users);
//   }, [users]);

//   // Search functionality
//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const filtered = users.filter(
//         (user) =>
//           user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           user.position.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filtered);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchQuery, users]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFormData((prev) => ({
//           ...prev,
//           profileImage: e.target.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     setTimeout(() => {
//       if (isEditing) {
//         editUser(editingUserId, formData);
//       } else {
//         addNewUser(formData);
//       }

//       setSubmitSuccess(true);
//       setIsSubmitting(false);

//       setTimeout(() => {
//         resetForm();
//         setSubmitSuccess(false);
//       }, 2000);
//     }, 1000);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       position: "",
//       experience: "",
//       skills: "",
//       bio: "",
//       profileImage: null,
//     });
//     setIsEditing(false);
//     setEditingUserId(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleReset = () => {
//     resetForm();
//     setSubmitSuccess(false);
//   };

//   const handleEditUser = (user) => {
//     setFormData(user);
//     setIsEditing(true);
//     setEditingUserId(user.id);
//     setShowUserDetails(false);
//     setSearchQuery("");
//   };

//   const handleViewUser = (user) => {
//     setSelectedUser(user);
//     setShowUserDetails(true);
//   };

//   const handleDeleteUser = (user) => {
//     setUserToDelete(user);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (userToDelete) {
//       deleteUser(userToDelete.id);
//       setShowDeleteConfirm(false);
//       setUserToDelete(null);
//       setSearchQuery("");

//       // Show success message
//       setTimeout(() => {
//         setSubmitSuccess(true);
//         setTimeout(() => setSubmitSuccess(false), 2000);
//       }, 100);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setUserToDelete(null);
//   };

//   const isFormValid = formData.name.trim() && formData.email.trim();
//   const filledFields = Object.values(formData).filter(
//     (value) => value && value.toString().trim()
//   ).length;
//   const completionPercentage = Math.round((filledFields / 10) * 100);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-slate-800 mb-4">
//             User Management System
//           </h1>
//           <p className="text-lg text-slate-600">
//             Create new users or search and edit existing ones
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Search Section */}
//           <div className="lg:col-span-1">
//             <Card className="shadow-lg mb-6">
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Search className="w-5 h-5" />
//                   Search Users
//                 </CardTitle>
//                 <CardDescription>Find and edit existing users</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search by name, email, or position..."
//                     className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
//                   />

//                   {searchResults.length > 0 && (
//                     <div className="space-y-2 max-h-60 overflow-y-auto">
//                       {searchResults.map((user) => (
//                         <div
//                           key={user.id}
//                           className="bg-white border rounded-lg p-3 hover:shadow-md transition-all"
//                         >
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                               {user.profileImage ? (
//                                 <img
//                                   src={user.profileImage}
//                                   alt={user.name}
//                                   className="w-8 h-8 rounded-full object-cover"
//                                 />
//                               ) : (
//                                 user.name.charAt(0).toUpperCase()
//                               )}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-medium text-sm text-slate-800 truncate">
//                                 {user.name}
//                               </h4>
//                               <p className="text-xs text-slate-500 truncate">
//                                 {user.email}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex gap-1">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => handleViewUser(user)}
//                               className="flex-1 text-xs"
//                             >
//                               <Eye className="w-3 h-3 mr-1" />
//                               View
//                             </Button>
//                             <Button
//                               size="sm"
//                               onClick={() => handleEditUser(user)}
//                               className="flex-1 text-xs bg-indigo-600 hover:bg-indigo-700"
//                             >
//                               <Edit className="w-3 h-3 mr-1" />
//                               Edit
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => handleDeleteUser(user)}
//                               className="flex-1 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
//                             >
//                               <Trash2 className="w-3 h-3 mr-1" />
//                               Delete
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {searchQuery && searchResults.length === 0 && (
//                     <p className="text-sm text-slate-500 text-center py-4">
//                       No users found
//                     </p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Stats Card */}
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle className="text-lg">Statistics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="bg-blue-50 rounded-lg p-3 text-center">
//                     <div className="text-2xl font-bold text-blue-600">
//                       {users.length}
//                     </div>
//                     <div className="text-xs text-blue-600">Total Users</div>
//                   </div>
//                   <div className="bg-green-50 rounded-lg p-3 text-center">
//                     <div className="text-2xl font-bold text-green-600">
//                       {completionPercentage}%
//                     </div>
//                     <div className="text-xs text-green-600">Form Complete</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Form Section */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-2xl border-0">
//               <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
//                 <CardTitle className="text-2xl flex items-center gap-3">
//                   <User className="w-6 h-6" />
//                   {isEditing ? "Edit User Profile" : "Create New User"}
//                 </CardTitle>
//                 <CardDescription className="text-indigo-100">
//                   {isEditing
//                     ? "Update the user information below"
//                     : "Please provide user details below"}
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="p-8">
//                 <div className="space-y-6">
//                   {/* Profile Image */}
//                   <div className="bg-slate-50 rounded-xl p-6">
//                     <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                       <User className="w-5 h-5 text-indigo-600" />
//                       Profile Image
//                     </h3>

//                     <div className="flex justify-center">
//                       <div
//                         className="relative cursor-pointer"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         {formData.profileImage ? (
//                           <img
//                             src={formData.profileImage}
//                             alt="Profile preview"
//                             className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-all"
//                           />
//                         ) : (
//                           <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:shadow-xl transition-all">
//                             {formData.name
//                               ? formData.name.charAt(0).toUpperCase()
//                               : "?"}
//                           </div>
//                         )}

//                         <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 hover:bg-slate-50 transition-all">
//                           <Camera className="w-4 h-4 text-slate-600" />
//                         </div>

//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           onChange={handleImageUpload}
//                           accept="image/*"
//                           className="hidden"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Personal Information */}
//                   <div className="bg-slate-50 rounded-xl p-6">
//                     <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                       <User className="w-5 h-5 text-indigo-600" />
//                       Personal Details
//                     </h3>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Full Name *
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="Enter full name"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Email Address *
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="email@example.com"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div className="bg-slate-50 rounded-xl p-6">
//                     <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                       <Phone className="w-5 h-5 text-green-600" />
//                       Contact & Location
//                     </h3>

//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="+1 (555) 123-4567"
//                         />
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">
//                             Address
//                           </label>
//                           <input
//                             type="text"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                             placeholder="123 Main Street"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">
//                             City
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                             placeholder="Your city"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Professional Information */}
//                   <div className="bg-slate-50 rounded-xl p-6">
//                     <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                       <Briefcase className="w-5 h-5 text-purple-600" />
//                       Professional Details
//                     </h3>

//                     <div className="space-y-4">
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">
//                             Position/Title
//                           </label>
//                           <input
//                             type="text"
//                             name="position"
//                             value={formData.position}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                             placeholder="e.g., Software Developer"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">
//                             Experience Level
//                           </label>
//                           <select
//                             name="experience"
//                             value={formData.experience}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           >
//                             <option value="">Select experience</option>
//                             <option value="entry">
//                               Entry Level (0-2 years)
//                             </option>
//                             <option value="mid">Mid Level (3-5 years)</option>
//                             <option value="senior">
//                               Senior Level (6+ years)
//                             </option>
//                             <option value="lead">
//                               Lead/Manager (8+ years)
//                             </option>
//                           </select>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Skills (comma-separated)
//                         </label>
//                         <input
//                           type="text"
//                           name="skills"
//                           value={formData.skills}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="JavaScript, React, Node.js, Python"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Bio / Summary
//                         </label>
//                         <textarea
//                           name="bio"
//                           value={formData.bio}
//                           onChange={handleChange}
//                           rows={4}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm resize-none"
//                           placeholder="Tell us about yourself..."
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-4 pt-6">
//                     <Button
//                       onClick={handleSubmit}
//                       disabled={!isFormValid || isSubmitting}
//                       className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isSubmitting ? (
//                         <div className="flex items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                           {isEditing ? "Updating..." : "Creating..."}
//                         </div>
//                       ) : submitSuccess ? (
//                         <div className="flex items-center gap-2">
//                           <Check className="w-4 h-4" />
//                           Success!
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2">
//                           {isEditing ? (
//                             <Edit className="w-4 h-4" />
//                           ) : (
//                             <Plus className="w-4 h-4" />
//                           )}
//                           {isEditing ? "Update User" : "Add User"}
//                         </div>
//                       )}
//                     </Button>

//                     <Button
//                       onClick={handleReset}
//                       variant="outline"
//                       className="px-6 py-3 rounded-xl font-medium transition-all"
//                     >
//                       <X className="w-4 h-4 mr-2" />
//                       {isEditing ? "Cancel" : "Reset"}
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Preview Section */}
//           <div className="lg:col-span-1">
//             {/* Progress Card */}
//             <Card className="shadow-lg mb-6">
//               <CardHeader>
//                 <CardTitle className="text-lg">Form Progress</CardTitle>
//                 <CardDescription>Complete the profile</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex justify-between text-sm">
//                     <span>Completion</span>
//                     <span className="font-medium">{completionPercentage}%</span>
//                   </div>
//                   <div className="w-full bg-slate-200 rounded-full h-2">
//                     <div
//                       className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
//                       style={{ width: `${completionPercentage}%` }}
//                     />
//                   </div>
//                   <div className="text-xs text-slate-600">
//                     {filledFields} of 10 fields completed
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Live Preview Card */}
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle className="text-lg">Live Preview</CardTitle>
//                 <CardDescription>See how the profile looks</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {formData.name || formData.email ? (
//                   <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="relative">
//                         {formData.profileImage ? (
//                           <img
//                             src={formData.profileImage}
//                             alt="Profile"
//                             className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
//                           />
//                         ) : (
//                           <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
//                             {formData.name
//                               ? formData.name.charAt(0).toUpperCase()
//                               : "?"}
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-slate-800">
//                           {formData.name || "Your Name"}
//                         </h3>
//                         <p className="text-sm text-slate-600">
//                           {formData.position || "Your Position"}
//                         </p>
//                         {formData.experience && (
//                           <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
//                             {formData.experience.charAt(0).toUpperCase() +
//                               formData.experience.slice(1)}{" "}
//                             Level
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-2 text-sm">
//                       {formData.email && (
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <Mail className="w-4 h-4 text-indigo-500" />
//                           {formData.email}
//                         </div>
//                       )}

//                       {formData.phone && (
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <Phone className="w-4 h-4 text-green-500" />
//                           {formData.phone}
//                         </div>
//                       )}

//                       {(formData.address || formData.city) && (
//                         <div className="flex items-center gap-2 text-slate-600">
//                           <MapPin className="w-4 h-4 text-red-500" />
//                           {[formData.address, formData.city]
//                             .filter(Boolean)
//                             .join(", ")}
//                         </div>
//                       )}
//                     </div>

//                     {formData.skills && (
//                       <div className="mt-4">
//                         <h4 className="font-medium text-slate-800 mb-2 text-sm">
//                           Skills
//                         </h4>
//                         <div className="flex flex-wrap gap-1">
//                           {formData.skills
//                             .split(",")
//                             .slice(0, 3)
//                             .map((skill, index) => (
//                               <span
//                                 key={index}
//                                 className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
//                               >
//                                 {skill.trim()}
//                               </span>
//                             ))}
//                           {formData.skills.split(",").length > 3 && (
//                             <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
//                               +{formData.skills.split(",").length - 3}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {formData.bio && (
//                       <div className="mt-4">
//                         <h4 className="font-medium text-slate-800 mb-2 text-sm">
//                           About
//                         </h4>
//                         <p className="text-xs text-slate-600 leading-relaxed">
//                           {formData.bio.length > 80
//                             ? `${formData.bio.substring(0, 80)}...`
//                             : formData.bio}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-slate-500">
//                     <User className="w-12 h-12 mx-auto mb-3 text-slate-300" />
//                     <p className="text-sm">
//                       Start filling the form to see preview
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* User Details Modal */}
//         {showUserDetails && selectedUser && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-xl font-semibold leading-none tracking-tight">
//                       User Details
//                     </h3>
//                     <p className="text-sm text-slate-200">
//                       Complete profile information
//                     </p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowUserDetails(false)}
//                     className="text-white hover:bg-white/20"
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>

//               <div className="p-8 pt-0">
//                 <div className="space-y-6 pt-6">
//                   {/* Profile Header */}
//                   <div className="flex items-center gap-6 pb-6 border-b">
//                     {selectedUser.profileImage ? (
//                       <img
//                         src={selectedUser.profileImage}
//                         alt={selectedUser.name}
//                         className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-lg"
//                       />
//                     ) : (
//                       <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//                         {selectedUser.name.charAt(0).toUpperCase()}
//                       </div>
//                     )}

//                     <div>
//                       <h2 className="text-2xl font-bold text-slate-800">
//                         {selectedUser.name}
//                       </h2>
//                       <p className="text-lg text-slate-600">
//                         {selectedUser.position}
//                       </p>
//                       {selectedUser.experience && (
//                         <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
//                           {selectedUser.experience.charAt(0).toUpperCase() +
//                             selectedUser.experience.slice(1)}{" "}
//                           Level
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Contact Information */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                       Contact Information
//                     </h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3">
//                         <Mail className="w-5 h-5 text-indigo-500" />
//                         <span className="text-slate-600">
//                           {selectedUser.email}
//                         </span>
//                       </div>

//                       {selectedUser.phone && (
//                         <div className="flex items-center gap-3">
//                           <Phone className="w-5 h-5 text-green-500" />
//                           <span className="text-slate-600">
//                             {selectedUser.phone}
//                           </span>
//                         </div>
//                       )}

//                       {(selectedUser.address || selectedUser.city) && (
//                         <div className="flex items-center gap-3">
//                           <MapPin className="w-5 h-5 text-red-500" />
//                           <span className="text-slate-600">
//                             {[selectedUser.address, selectedUser.city]
//                               .filter(Boolean)
//                               .join(", ")}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Skills */}
//                   {selectedUser.skills && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                         Skills
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedUser.skills.split(",").map((skill, index) => (
//                           <span
//                             key={index}
//                             className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
//                           >
//                             {skill.trim()}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Bio */}
//                   {selectedUser.bio && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                         About
//                       </h3>
//                       <p className="text-slate-600 leading-relaxed">
//                         {selectedUser.bio}
//                       </p>
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="flex gap-4 pt-6 border-t">
//                     <Button
//                       onClick={() => handleEditUser(selectedUser)}
//                       className="flex-1"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={() => setShowUserDetails(false)}
//                       className="flex-1"
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {showDeleteConfirm && userToDelete && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-md w-full">
//               <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
//                 <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
//                   <AlertTriangle className="w-6 h-6" />
//                   Confirm Delete
//                 </h3>
//                 <p className="text-sm text-red-100">
//                   This action cannot be undone
//                 </p>
//               </div>

//               <div className="p-6 pt-0">
//                 <div className="text-center space-y-4 pt-6">
//                   <div className="flex items-center justify-center gap-4">
//                     {userToDelete.profileImage ? (
//                       <img
//                         src={userToDelete.profileImage}
//                         alt={userToDelete.name}
//                         className="w-16 h-16 rounded-full object-cover border-4 border-slate-100 shadow-md"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
//                         {userToDelete.name.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                     <div className="text-left">
//                       <h3 className="font-semibold text-slate-800">
//                         {userToDelete.name}
//                       </h3>
//                       <p className="text-sm text-slate-600">
//                         {userToDelete.email}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         {userToDelete.position}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-slate-700">
//                     Are you sure you want to delete this user? This action
//                     cannot be undone.
//                   </p>

//                   <div className="flex gap-3 pt-4">
//                     <Button
//                       onClick={cancelDelete}
//                       variant="outline"
//                       className="flex-1"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={confirmDelete}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                     >
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       Delete User
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Success Message */}
//         {submitSuccess && (
//           <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40">
//             <div className="flex items-center gap-2">
//               <Check className="w-5 h-5" />
//               {isEditing
//                 ? "User updated successfully!"
//                 : userToDelete
//                 ? "User deleted successfully!"
//                 : "User added successfully!"}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect, useRef } from "react";
// import Dashboard from "./Component/Dashboard";
// import Users from "./Component/Users";
// import Administrator from "./Component/Administrator";

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

// // Users Store Hook
// const useUsersStore = () => {
//   const [users, setUsers] = useState([
//   ])
//   const addNewUser = (user) => {
//     const newUser = {
//       ...user,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//     };
//     setUsers((prev) => [...prev, newUser]);
//   };

//   const editUser = (id, updatedUser) => {
//     setUsers((prev) =>
//       prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
//     );
//   };

//   const deleteUser = (id) => {
//     setUsers((prev) => prev.filter((user) => user.id !== id));
//   };

//   const deleteAllUsers = () => {
//     setUsers([]);
//   };

//   return { users, addNewUser, editUser, deleteUser, deleteAllUsers };
// };

// // Navigation Component
// const Navigation = ({
//   activeTab,
//   setActiveTab,
//   isMobileMenuOpen,
//   setIsMobileMenuOpen,
// }) => {
//   const navItems = [
//     { id: "dashboard", label: "Dashboard", icon: "📊" },
//     { id: "users", label: "Users", icon: "👥" },
//     { id: "create", label: "Create User", icon: "➕" },
//     { id: "admin", label: "Administrator", icon: "⚙️" },
//   ];

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
//         <div className="flex flex-col flex-grow bg-gradient-to-b from-slate-800 to-slate-900 overflow-y-auto">
//           <div className="flex items-center flex-shrink-0 px-4 py-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-xl">👥</span>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-white">UserMgmt</h1>
//                 <p className="text-slate-300 text-sm">Admin Panel</p>
//               </div>
//             </div>
//           </div>

//           <nav className="mt-8 flex-1 px-4 space-y-2">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`w-full group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
//                   activeTab === item.id
//                     ? "bg-indigo-600 text-white shadow-lg"
//                     : "text-slate-300 hover:text-white hover:bg-slate-700"
//                 }`}
//               >
//                 <span className="mr-3 text-lg">{item.icon}</span>
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           <div className="flex-shrink-0 p-4">
//             <div className="bg-slate-700 rounded-lg p-4">
//               <p className="text-slate-300 text-sm">System Status</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <span className="text-green-400 text-sm font-medium">
//                   Online
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className="lg:hidden">
//         <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
//               <span className="text-white">👥</span>
//             </div>
//             <h1 className="text-lg font-bold text-slate-800">UserMgmt</h1>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             ☰
//           </Button>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="bg-white border-b border-gray-200">
//             <nav className="px-4 py-3 space-y-1">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
//                     activeTab === item.id
//                       ? "bg-indigo-100 text-indigo-700"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
//                   }`}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// // User Form Component
// const UserForm = ({ addNewUser, editUser, editingUser, onEditingUser }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     position: "",
//     experience: "",
//     skills: "",
//     bio: "",
//     profileImage: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingUserId, setEditingUserId] = useState(null);

//   const fileInputRef = useRef(null);

//   // Handle editing user
//   useEffect(() => {
//     if (editingUser) {
//       setFormData(editingUser);
//       setIsEditing(true);
//       setEditingUserId(editingUser.id);
//     }
//   }, [editingUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFormData((prev) => ({
//           ...prev,
//           profileImage: e.target.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     setTimeout(() => {
//       if (isEditing) {
//         editUser(editingUserId, formData);
//       } else {
//         addNewUser(formData);
//       }

//       setSubmitSuccess(true);
//       setIsSubmitting(false);

//       setTimeout(() => {
//         resetForm();
//         setSubmitSuccess(false);
//       }, 2000);
//     }, 1000);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       position: "",
//       experience: "",
//       skills: "",
//       bio: "",
//       profileImage: null,
//     });
//     setIsEditing(false);
//     setEditingUserId(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     if (onEditingUser) {
//       onEditingUser(null);
//     }
//   };

//   const isFormValid = formData.name.trim() && formData.email.trim();
//   const filledFields = Object.values(formData).filter(
//     (value) => value && value.toString().trim()
//   ).length;
//   const completionPercentage = Math.round((filledFields / 10) * 100);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-slate-800">
//           {isEditing ? "Edit User Profile" : "Create New User"}
//         </h2>
//         <p className="text-slate-600">
//           {isEditing
//             ? "Update the user information below"
//             : "Add a new user to the system"}
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Form Section */}
//         <div className="lg:col-span-2">
//           <Card className="shadow-lg">
//             <CardContent className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Profile Image */}
//                 <div className="bg-slate-50 rounded-xl p-6">
//                   <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                     <span>👤</span>
//                     Profile Image
//                   </h3>

//                   <div className="flex justify-center">
//                     <div
//                       className="relative cursor-pointer"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       {formData.profileImage ? (
//                         <img
//                           src={formData.profileImage}
//                           alt="Profile preview"
//                           className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-all"
//                         />
//                       ) : (
//                         <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:shadow-xl transition-all">
//                           {formData.name
//                             ? formData.name.charAt(0).toUpperCase()
//                             : "?"}
//                         </div>
//                       )}

//                       <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 hover:bg-slate-50 transition-all">
//                         <span className="text-slate-600">📷</span>
//                       </div>

//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleImageUpload}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Personal Information */}
//                 <div className="bg-slate-50 rounded-xl p-6">
//                   <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                     Personal Details
//                   </h3>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                         placeholder="Enter full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                         placeholder="email@example.com"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="bg-slate-50 rounded-xl p-6">
//                   <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                     <span>📞</span>
//                     Contact & Location
//                   </h3>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                         placeholder="+1 (555) 123-4567"
//                       />
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Address
//                         </label>
//                         <input
//                           type="text"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="123 Main Street"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           City
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="Your city"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Professional Information */}
//                 <div className="bg-slate-50 rounded-xl p-6">
//                   <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                     Professional Details
//                   </h3>

//                   <div className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Position/Title
//                         </label>
//                         <input
//                           type="text"
//                           name="position"
//                           value={formData.position}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                           placeholder="e.g., Software Developer"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Experience Level
//                         </label>
//                         <select
//                           name="experience"
//                           value={formData.experience}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                         >
//                           <option value="">Select experience</option>
//                           <option value="entry">Entry Level (0-2 years)</option>
//                           <option value="mid">Mid Level (3-5 years)</option>
//                           <option value="senior">
//                             Senior Level (6+ years)
//                           </option>
//                           <option value="lead">Lead/Manager (8+ years)</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Skills (comma-separated)
//                       </label>
//                       <input
//                         type="text"
//                         name="skills"
//                         value={formData.skills}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
//                         placeholder="JavaScript, React, Node.js, Python"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Bio / Summary
//                       </label>
//                       <textarea
//                         name="bio"
//                         value={formData.bio}
//                         onChange={handleChange}
//                         rows={4}
//                         className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm resize-none"
//                         placeholder="Tell us about yourself..."
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-6">
//                   <Button
//                     type="submit"
//                     disabled={!isFormValid || isSubmitting}
//                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         {isEditing ? "Updating..." : "Creating..."}
//                       </div>
//                     ) : submitSuccess ? (
//                       <div className="flex items-center gap-2">
//                         <span>✅</span>
//                         Success!
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <span>{isEditing ? "" : ""}</span>
//                         {isEditing ? "Update User" : "Add User"}
//                       </div>
//                     )}
//                   </Button>

//                   <Button
//                     type="button"
//                     onClick={resetForm}
//                     variant="outline"
//                     className="px-6 py-3 rounded-xl font-medium transition-all"
//                   >
//                     <span className="mr-2"></span>
//                     {isEditing ? "Cancel" : "Reset"}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Preview Section */}
//         <div className="lg:col-span-1">
//           {/* Progress Card */}
//           <Card className="shadow-lg mb-6">
//             <CardHeader>
//               <CardTitle className="text-lg">Form Progress</CardTitle>
//               <CardDescription>Complete the profile</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between text-sm">
//                   <span>Completion</span>
//                   <span className="font-medium">{completionPercentage}%</span>
//                 </div>
//                 <div className="w-full bg-slate-200 rounded-full h-2">
//                   <div
//                     className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
//                     style={{ width: `${completionPercentage}%` }}
//                   />
//                 </div>
//                 <div className="text-xs text-slate-600">
//                   {filledFields} of 10 fields completed
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Live Preview Card */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-lg">Live Preview</CardTitle>
//               <CardDescription>See how the profile looks</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {formData.name || formData.email ? (
//                 <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="relative">
//                       {formData.profileImage ? (
//                         <img
//                           src={formData.profileImage}
//                           alt="Profile"
//                           className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
//                         />
//                       ) : (
//                         <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
//                           {formData.name
//                             ? formData.name.charAt(0).toUpperCase()
//                             : "?"}
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-slate-800">
//                         {formData.name || "Your Name"}
//                       </h3>
//                       <p className="text-sm text-slate-600">
//                         {formData.position || "Your Position"}
//                       </p>
//                       {formData.experience && (
//                         <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
//                           {formData.experience.charAt(0).toUpperCase() +
//                             formData.experience.slice(1)}{" "}
//                           Level
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="space-y-2 text-sm">
//                     {formData.email && (
//                       <div className="flex items-center gap-2 text-slate-600">
//                         <span>📧</span>
//                         {formData.email}
//                       </div>
//                     )}

//                     {formData.phone && (
//                       <div className="flex items-center gap-2 text-slate-600">
//                         <span>📞</span>
//                         {formData.phone}
//                       </div>
//                     )}

//                     {(formData.address || formData.city) && (
//                       <div className="flex items-center gap-2 text-slate-600">
//                         <span>📍</span>
//                         {[formData.address, formData.city]
//                           .filter(Boolean)
//                           .join(", ")}
//                       </div>
//                     )}
//                   </div>

//                   {formData.skills && (
//                     <div className="mt-4">
//                       <h4 className="font-medium text-slate-800 mb-2 text-sm">
//                         Skills
//                       </h4>
//                       <div className="flex flex-wrap gap-1">
//                         {formData.skills
//                           .split(",")
//                           .slice(0, 3)
//                           .map((skill, index) => (
//                             <span
//                               key={index}
//                               className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
//                             >
//                               {skill.trim()}
//                             </span>
//                           ))}
//                         {formData.skills.split(",").length > 3 && (
//                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
//                             +{formData.skills.split(",").length - 3}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {formData.bio && (
//                     <div className="mt-4">
//                       <h4 className="font-medium text-slate-800 mb-2 text-sm">
//                         About
//                       </h4>
//                       <p className="text-xs text-slate-600 leading-relaxed">
//                         {formData.bio.length > 80
//                           ? `${formData.bio.substring(0, 80)}...`
//                           : formData.bio}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-slate-500">
//                   <span className="text-4xl block mb-3">👤</span>
//                   <p className="text-sm">
//                     Start filling the form to see preview
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// // User Details Modal
// const UserDetailsModal = ({ user, isOpen, onClose, onEdit, onDelete }) => {
//   if (!isOpen || !user) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
//       <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-xl font-semibold leading-none tracking-tight">
//                 User Details
//               </h3>
//               <p className="text-sm text-slate-200">
//                 Complete profile information
//               </p>
//             </div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClose}
//               className="text-white hover:bg-white/20"
//             >
//               ❌
//             </Button>
//           </div>
//         </div>

//         <div className="p-8 pt-0">
//           <div className="space-y-6 pt-6">
//             {/* Profile Header */}
//             <div className="flex items-center gap-6 pb-6 border-b">
//               {user.profileImage ? (
//                 <img
//                   src={user.profileImage}
//                   alt={user.name}
//                   className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-lg"
//                 />
//               ) : (
//                 <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>
//               )}

//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800">
//                   {user.name}
//                 </h2>
//                 <p className="text-lg text-slate-600">{user.position}</p>
//                 {user.experience && (
//                   <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
//                     {user.experience.charAt(0).toUpperCase() +
//                       user.experience.slice(1)}{" "}
//                     Level
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                 Contact Information
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <span>📧</span>
//                   <span className="text-slate-600">{user.email}</span>
//                 </div>

//                 {user.phone && (
//                   <div className="flex items-center gap-3">
//                     <span>📞</span>
//                     <span className="text-slate-600">{user.phone}</span>
//                   </div>
//                 )}

//                 {(user.address || user.city) && (
//                   <div className="flex items-center gap-3">
//                     <span>📍</span>
//                     <span className="text-slate-600">
//                       {[user.address, user.city].filter(Boolean).join(", ")}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Skills */}
//             {user.skills && (
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                   Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {user.skills.split(",").map((skill, index) => (
//                     <span
//                       key={index}
//                       className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
//                     >
//                       {skill.trim()}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Bio */}
//             {user.bio && (
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-800 mb-4">
//                   About
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">{user.bio}</p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-4 pt-6 border-t">
//               <Button
//                 onClick={() => {
//                   onEdit(user);
//                   onClose();
//                 }}
//                 className="flex-1"
//               >
//                 <span className="mr-2">✏️</span>
//                 Edit Profile
//               </Button>
//               <Button variant="outline" onClick={onClose} className="flex-1">
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Delete Confirmation Modal
// const DeleteConfirmModal = ({ user, isOpen, onConfirm, onCancel }) => {
//   if (!isOpen || !user) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
//       <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-md w-full">
//         <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
//           <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
//             <span>⚠️</span>
//             Confirm Delete
//           </h3>
//           <p className="text-sm text-red-100">This action cannot be undone</p>
//         </div>

//         <div className="p-6 pt-0">
//           <div className="text-center space-y-4 pt-6">
//             <div className="flex items-center justify-center gap-4">
//               {user.profileImage ? (
//                 <img
//                   src={user.profileImage}
//                   alt={user.name}
//                   className="w-16 h-16 rounded-full object-cover border-4 border-slate-100 shadow-md"
//                 />
//               ) : (
//                 <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div className="text-left">
//                 <h3 className="font-semibold text-slate-800">{user.name}</h3>
//                 <p className="text-sm text-slate-600">{user.email}</p>
//                 <p className="text-xs text-slate-500">{user.position}</p>
//               </div>
//             </div>

//             <p className="text-slate-700">
//               Are you sure you want to delete this user? This action cannot be
//               undone.
//             </p>

//             <div className="flex gap-3 pt-4">
//               <Button onClick={onCancel} variant="outline" className="flex-1">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={onConfirm}
//                 variant="destructive"
//                 className="flex-1"
//               >
//                 <span className="mr-2">🗑️</span>
//                 Delete User
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// function App() {
//   const { users, addNewUser, editUser, deleteUser, deleteAllUsers } =
//     useUsersStore();

//   // Navigation state
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Modal states
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);

//   // Success message state
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   // Handle user actions
//   const handleViewUser = (user) => {
//     setSelectedUser(user);
//     setShowUserDetails(true);
//   };

//   const handleEditUser = (user) => {
//     setEditingUser(user);
//     setActiveTab("create");
//   };

//   const handleDeleteUser = (user) => {
//     setUserToDelete(user);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (userToDelete) {
//       deleteUser(userToDelete.id);
//       setShowDeleteConfirm(false);
//       setUserToDelete(null);
//       showSuccessMessage("User deleted successfully!");
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setUserToDelete(null);
//   };

//   const handleDeleteAllUsers = () => {
//     deleteAllUsers();
//     showSuccessMessage("All users deleted successfully!");
//   };

//   const showSuccessMessage = (message) => {
//     setSuccessMessage(message);
//     setSubmitSuccess(true);
//     setTimeout(() => {
//       setSubmitSuccess(false);
//       setSuccessMessage("");
//     }, 3000);
//   };

//   // Render current tab content
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return <Dashboard users={users} />;

//       case "users":
//         return (
//           <Users
//             users={users}
//             onEditUser={handleEditUser}
//             onViewUser={handleViewUser}
//             onDeleteUser={handleDeleteUser}
//           />
//         );

//       case "create":
//         return (
//           <UserForm
//             addNewUser={addNewUser}
//             editUser={editUser}
//             editingUser={editingUser}
//             onEditingUser={setEditingUser}
//           />
//         );

//       case "admin":
//         return (
//           <Administrator
//             users={users}
//             onDeleteAllUsers={handleDeleteAllUsers}
//           />
//         );

//       default:
//         return <Dashboard users={users} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
//       {/* Navigation */}
//       <Navigation
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />

//       {/* Main Content */}
//       <div className="lg:pl-64">
//         <main className="p-6">
//           <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
//         </main>
//       </div>

//       {/* Modals */}
//       <UserDetailsModal
//         user={selectedUser}
//         isOpen={showUserDetails}
//         onClose={() => setShowUserDetails(false)}
//         onEdit={handleEditUser}
//         onDelete={handleDeleteUser}
//       />

//       <DeleteConfirmModal
//         user={userToDelete}
//         isOpen={showDeleteConfirm}
//         onConfirm={confirmDelete}
//         onCancel={cancelDelete}
//       />

//       {/* Success Message */}
//       {submitSuccess && (
//         <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40">
//           <div className="flex items-center gap-2">
//             <span>✅</span>
//             {successMessage || "Operation completed successfully!"}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useEffect } from "react";

// const App = () => {
//   useEffect(() => {
//     // Load Cloudinary script dynamically
//     const script = document.createElement("script");
//     script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
//     script.async = true;
//     script.onload = () => {
//       if (window.cloudinary) {
//         const myWidget = window.cloudinary.createUploadWidget(
//           {
//             cloudName: "dpttonwcs",
//             uploadPreset: "Julius",
//           },
//           (error, result) => {
//             if (!error && result && result.event === "success") {
//               alert(result.info.secure_url)
//               console.log("Done! Here is the image info: ", result.info);
//             }
//           }
//         );

//         // Attach widget open to button
//         const btn = document.getElementById("upload_widget");
//         if (btn) {
//           btn.addEventListener("click", () => myWidget.open(), false);
//         }
//       }
//     };

//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button
//         id="upload_widget"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Upload files
//       </button>
//     </div>
//   );
// };

// export default App;


import { useState } from "react";
import { useUsersStore } from "/useUsersStore";
import Navigation from "./Component/Navigation";
import UserForm from "./Component/UserForm";
import UserDetailsModal from "./Component/UserDetailsModal";
import DeleteConfirmModal from "./Component/DeleteConfirmModal";
import Dashboard from "./Component/Dashboard";
import Users from "./Component/Users";
import Administrator from "./Component/Administrator";

function App() {
  const { users, addNewUser, editUser, deleteUser, deleteAllUsers } =
    useUsersStore();

  // Navigation state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal states
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Success message state
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle user actions
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setActiveTab("create");
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      showSuccessMessage("User deleted successfully!");
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleDeleteAllUsers = () => {
    deleteAllUsers();
    showSuccessMessage("All users deleted successfully!");
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  // Render current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard users={users} />;
      case "users":
        return (
          <Users
            users={users}
            onEditUser={handleEditUser}
            onViewUser={handleViewUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      case "create":
        return (
          <UserForm
            addNewUser={addNewUser}
            editUser={editUser}
            editingUser={editingUser}
            onEditingUser={setEditingUser}
          />
        );
      case "admin":
        return (
          <Administrator
            users={users}
            onDeleteAllUsers={handleDeleteAllUsers}
          />
        );
      default:
        return <Dashboard users={users} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-6">
          <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
        </main>
      </div>

      {/* Modals */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={showUserDetails}
        onClose={() => setShowUserDetails(false)}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <DeleteConfirmModal
        user={userToDelete}
        isOpen={showDeleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Success Message */}
      {submitSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40">
          <div className="flex items-center gap-2">
            <span>✅</span>
            {successMessage || "Operation completed successfully!"}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;