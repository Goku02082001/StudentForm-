import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentSubmissionForm from "../page/SubmissionForm";
import SubmissionCards from "../page/ShowSubmission";
export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: "🏠", gradient: "from-yellow-500 to-orange-500" },
    {
      name: "Submit Assignment",
      icon: "📝",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Show Submission",
      icon: "📊",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: isLoggedIn ? "Logout" : "Login",
      icon: isLoggedIn ? "🚪" : "🔐",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://studentform-m78a.onrender.com/api/getSubmission");
      const data = await response.json();
      setSubmissions(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="w-72 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-r border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>

        <div className="relative p-8 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🎓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                EduPortal
              </h2>
              <p className="text-sm text-gray-400 font-medium">
                Student Dashboard
              </p>
            </div>
          </div>
        </div>

        <nav className="relative mt-8 px-4">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    if (item.name === "Login") {
                      navigate("/login");
                    } else if (item.name === "Logout") {
                      localStorage.removeItem("isLoggedIn");
                      setIsLoggedIn(false);
                      setActiveItem("Home");
                      navigate("/login");
                    } else {
                      setActiveItem(item.name);
                    }
                  }}
                  className={`group w-full text-left relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r " +
                        item.gradient +
                        " shadow-2xl shadow-purple-500/25"
                      : "bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-4 p-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeItem === item.name
                          ? "bg-white/20 shadow-lg"
                          : "bg-gradient-to-r " + item.gradient + " shadow-md"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span
                        className={`font-semibold text-lg transition-colors duration-300 ${
                          activeItem === item.name
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    {activeItem === item.name && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {activeItem !== item.name && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-medium">
                System Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>

        <div className="relative z-10 p-8 ">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                {activeItem}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden ml-56">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">
                      {menuItems.find((item) => item.name === activeItem)?.icon}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Welcome to {activeItem}
                    </h2>
                    <p className="text-gray-400">
                      Click different menu items to explore the interface
                    </p>
                  </div>
                </div>

                {activeItem === "Home" && (
                  <div className="text-gray-300 mt-4 space-y-4 leading-relaxed">
                    <p>
                      Welcome to the{" "}
                      <span className="font-semibold text-white">
                        Student LMS
                      </span>{" "}
                      – a modern Learning Management System designed to help
                      students manage assignments, view submissions, and stay
                      organized.
                    </p>
                    <p>With this dashboard, you can easily:</p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Submit assignments on time</li>
                      <li>Track your submissions</li>
                      <li>Access your academic resources</li>
                      <li>Stay updated with announcements</li>
                    </ul>
                    <p>
                      Click on the menu items to explore different features of
                      the portal.
                    </p>
                  </div>
                )}
                {activeItem === "Submit Assignment" && (
                  <AssignmentSubmissionForm />
                )}

                {activeItem === "Show Submission" && (
                  <SubmissionCards
                    submissions={submissions}
                    loading={loading}
                    error={error}
                  />
                )}
                {activeItem !== "Home" &&
                  activeItem !== "Login" &&
                  activeItem !== "Submit Assignment" &&
                  activeItem !== "Show Submission" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4"></div>
                          <h3 className="text-white font-semibold mb-2">
                            Feature {i}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Interactive dashboard elements with stunning visual
                            effects and smooth animations.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
