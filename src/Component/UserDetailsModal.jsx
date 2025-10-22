import Button from "./Button";

const UserDetailsModal = ({ user, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                User Details
              </h3>
              <p className="text-sm text-slate-200">
                Complete profile information
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ❌
            </Button>
          </div>
        </div>

        <div className="p-8 pt-0">
          <div className="space-y-6 pt-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6 pb-6 border-b">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {user.name}
                </h2>
                <p className="text-lg text-slate-600">{user.position}</p>
                {user.experience && (
                  <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    {user.experience.charAt(0).toUpperCase() +
                      user.experience.slice(1)}{" "}
                    Level
                  </span>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span>📧</span>
                  <span className="text-slate-600">{user.email}</span>
                </div>

                {user.phone && (
                  <div className="flex items-center gap-3">
                    <span>📞</span>
                    <span className="text-slate-600">{user.phone}</span>
                  </div>
                )}

                {(user.address || user.city) && (
                  <div className="flex items-center gap-3">
                    <span>📍</span>
                    <span className="text-slate-600">
                      {[user.address, user.city].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {user.skills && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            {user.bio && (
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  About
                </h3>
                <p className="text-slate-600 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                onClick={() => {
                  onEdit(user);
                  onClose();
                }}
                className="flex-1"
              >
                <span className="mr-2">✏️</span>
                Edit Profile
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
