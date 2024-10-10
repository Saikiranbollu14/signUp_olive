import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (input) => {
    const usernamePattern = /^[0-9A-Za-z]{6,16}$/;
    return usernamePattern.test(input);
  };

  const validatePassword = (input) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&*+#^=])[A-Za-z\d@$!%?&*+#^=]{8,}$/;
    return passwordPattern.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateUsername(username)) {
      setUsernameError(
        "Username must be 6-16 characters long, only contain letters and numbers, and have no spaces."
      );
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be 8 characters with upper, lower, number, and special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setSuccessMessage("Login Successful");

      setTimeout(() => {
        setSuccessMessage("");
        onLogin(username);
        navigate("/dashboard");
      }, 1000);

      setUsername("");
      setPassword("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value.replace(/\s+/g, "");
    setUsername(input);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-green-500">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl h-full p-8 bg-white shadow-md rounded-lg z-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Login To Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                usernameError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              aria-invalid={!!usernameError}
              aria-describedby="username-error"
              aria-label="Username"
            />
            {usernameError && (
              <p id="username-error" className="text-red-500 text-sm mt-1">
                {usernameError}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10`}
              aria-invalid={!!passwordError}
              aria-describedby="password-error"
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 mt-5"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
