import Button from "./Button";

const DeleteConfirmModal = ({ user, isOpen, onConfirm, onCancel }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-md w-full">
        <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
            <span>⚠️</span>
            Confirm Delete
          </h3>
          <p className="text-sm text-red-100">This action cannot be undone</p>
        </div>

        <div className="p-6 pt-0">
          <div className="text-center space-y-4 pt-6">
            <div className="flex items-center justify-center gap-4">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-slate-100 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left">
                <h3 className="font-semibold text-slate-800">{user.name}</h3>
                <p className="text-sm text-slate-600">{user.email}</p>
                <p className="text-xs text-slate-500">{user.position}</p>
              </div>
            </div>

            <p className="text-slate-700">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>

            <div className="flex gap-3 pt-4">
              <Button onClick={onCancel} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                variant="destructive"
                className="flex-1"
              >
                <span className="mr-2">🗑️</span>
                Delete User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
