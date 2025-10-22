import Button from "./Button";
import Users from "/public/users.jpeg";
import Ad from "/public/ad.jpeg";
import N1 from "/public/N1.jpeg";

const Navigation = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: N1 },
    { id: "users", label: "Users", icon: Ad },
    { id: "create", label: "Create User", icon: Users }, // imported image
    { id: "admin", label: "Administrator", icon: "⚙️" },
  ];

  // helper function: check if value is an imported image
  const isImage = (icon) =>
    (typeof icon === "string" && icon.startsWith("/")) ||
    typeof icon === "object";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-slate-800 to-slate-900 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white"> EasyProfile </h1>
                <p className="text-slate-300 text-sm">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {isImage(item.icon) ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5 mr-3 rounded"
                  />
                ) : (
                  <span className="mr-3 text-lg">{item.icon}</span>
                )}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex-shrink-0 p-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-300 text-sm">System Status</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white">👥</span>
            </div>
            <h1 className="text-lg font-bold text-slate-800">EasyProfile</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="bg-white border-b border-gray-200">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === item.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {isImage(item.icon) ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 mr-3 rounded"
                    />
                  ) : (
                    <span className="mr-3">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
