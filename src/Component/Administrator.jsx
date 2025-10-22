
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