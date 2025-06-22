import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SexySidebarAuth() {
  const [activeForm, setActiveForm] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const endpoint =
      activeForm === 'login'
        ? 'http://localhost:8080/api/login'
        : 'http://localhost:8080/api/register';
    const payload =
      activeForm === 'login'
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      alert(`${activeForm === 'login' ? 'Login' : 'Registration'} successful!`);
      console.log(result);

      if (activeForm === 'login') {
         localStorage.setItem("isLoggedIn", "true");
        navigate('/');
      }
    } else {
      alert(`Error: ${result.message || 'Something went wrong'}`);
    }
  } catch (err) {
    alert('Network error');
    console.error(err);
  }
};



  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-pink-400" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Edu portal
            </h1>
            <p className="text-xl opacity-80">Experience of Future Study For Student</p>
          </div>
        </div>
      </div>

      <div className="w-[500px] relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        <div className="absolute top-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-10 h-full flex flex-col justify-center p-8">
          <div className="relative mb-8">
            <div className="flex bg-white/10 rounded-full p-1 backdrop-blur-sm">
              <button
                onClick={() => setActiveForm("login")}
                className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                  activeForm === "login"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveForm("register")}
                className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                  activeForm === "register"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                activeForm === "login"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8 pointer-events-none"
              }`}
            >
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60 group-focus-within:text-pink-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:border-pink-400 focus:bg-white/15 focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-pink-500/10 transition-all duration-300"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60 group-focus-within:text-pink-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:border-pink-400 focus:bg-white/15 focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-pink-500/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-pink-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-white/80">
                    <input type="checkbox" className="mr-2 rounded" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transform transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div
              className={`absolute inset-0 transition-all duration-500 ${
                activeForm === "register"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8 pointer-events-none"
              }`}
            >
              <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:border-blue-400 focus:bg-white/15 focus:outline-none transition-all duration-300 text-sm"
                    />
                  </div>
                

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:border-blue-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:border-blue-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/60 backdrop-blur-sm focus:border-blue-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-blue-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="text-sm text-white/80">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1 rounded" />
                    <span>
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transform transition-all duration-300"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-center text-white/60 text-sm mb-4">
              Or continue with
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 group">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-white text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 group">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-white text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
