import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./Card";
import Button from "./Button";

const uploadToCloudinary = async (file) => {
  const cloudName = "dpttonwcs"; // Replace with your Cloudinary cloud name
  const uploadPreset = "Julius"; // Replace with your Cloudinary unsigned upload preset
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

const UserForm = ({ addNewUser, editUser, editingUser, onEditingUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    position: "",
    experience: "",
    skills: "",
    bio: "",
    profileImage: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
      setIsEditing(true);
      setEditingUserId(editingUser.id);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError(null);
      setIsSubmitting(true);
      const imageUrl = await uploadToCloudinary(file);
      setIsSubmitting(false);
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          profileImage: imageUrl,
        }));
      } else {
        setUploadError("Failed to upload image to Cloudinary.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (isEditing) {
        editUser(editingUserId, formData);
      } else {
        addNewUser(formData);
      }

      setSubmitSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        resetForm();
        setSubmitSuccess(false);
      }, 2000);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      position: "",
      experience: "",
      skills: "",
      bio: "",
      profileImage: null,
    });
    setIsEditing(false);
    setEditingUserId(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onEditingUser) {
      onEditingUser(null);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim();
  const filledFields = Object.values(formData).filter(
    (value) => value && value.toString().trim()
  ).length;
  const completionPercentage = Math.round((filledFields / 10) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          {isEditing ? "Edit User Profile" : "Create New User"}
        </h2>
        <p className="text-slate-600">
          {isEditing
            ? "Update the user information below"
            : "Add a new user to the system"}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span>👤</span>
                    Profile Image
                  </h3>

                  <div className="flex justify-center">
                    <div
                      className="relative cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {formData.profileImage ? (
                        <img
                          src={formData.profileImage}
                          alt="Profile preview"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-all"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:shadow-xl transition-all">
                          {formData.name
                            ? formData.name.charAt(0).toUpperCase()
                            : "?"}
                        </div>
                      )}

                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 hover:bg-slate-50 transition-all">
                        <span className="text-slate-600">📷</span>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  {uploadError && (
                    <p className="text-red-600 text-sm mt-2 text-center">
                      {uploadError}
                    </p>
                  )}
                </div>

                {/* Personal Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    Personal Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span>📞</span>
                    Contact & Location
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                          placeholder="Your city"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    Professional Details
                  </h3>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Position/Title
                        </label>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                          placeholder="e.g., Software Developer"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Experience Level
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                        >
                          <option value="">Select experience</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (3-5 years)</option>
                          <option value="senior">
                            Senior Level (6+ years)
                          </option>
                          <option value="lead">Lead/Manager (8+ years)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Skills (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                        placeholder="JavaScript, React, Node.js, Python"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bio / Summary
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isEditing ? "Updating..." : "Creating..."}
                      </div>
                    ) : submitSuccess ? (
                      <div className="flex items-center gap-2">
                        <span>✅</span>
                        Success!
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{isEditing ? "" : ""}</span>
                        {isEditing ? "Update User" : "Add User"}
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="px-6 py-3 rounded-xl font-medium transition-all"
                  >
                    <span className="mr-2"></span>
                    {isEditing ? "Cancel" : "Reset"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          {/* Progress Card */}
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Form Progress</CardTitle>
              <CardDescription>Complete the profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span className="font-medium">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-slate-600">
                  {filledFields} of 10 fields completed
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Preview Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <CardDescription>See how the profile looks</CardDescription>
            </CardHeader>
            <CardContent>
              {formData.name || formData.email ? (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      {formData.profileImage ? (
                        <img
                          src={formData.profileImage}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                          {formData.name
                            ? formData.name.charAt(0).toUpperCase()
                            : "?"}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {formData.name || "Your Name"}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {formData.position || "Your Position"}
                      </p>
                      {formData.experience && (
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                          {formData.experience.charAt(0).toUpperCase() +
                            formData.experience.slice(1)}{" "}
                          Level
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {formData.email && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>📧</span>
                        {formData.email}
                      </div>
                    )}

                    {formData.phone && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>📞</span>
                        {formData.phone}
                      </div>
                    )}

                    {(formData.address || formData.city) && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>📍</span>
                        {[formData.address, formData.city]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    )}
                  </div>

                  {formData.skills && (
                    <div className="mt-4">
                      <h4 className="font-medium text-slate-800 mb-2 text-sm">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.skills
                          .split(",")
                          .slice(0, 3)
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        {formData.skills.split(",").length > 3 && (
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
                            +{formData.skills.split(",").length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.bio && (
                    <div className="mt-4">
                      <h4 className="font-medium text-slate-800 mb-2 text-sm">
                        About
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {formData.bio.length > 80
                          ? `${formData.bio.substring(0, 80)}...`
                          : formData.bio}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <span className="text-4xl block mb-3">👤</span>
                  <p className="text-sm">
                    Start filling the form to see preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
