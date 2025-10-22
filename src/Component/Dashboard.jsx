
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