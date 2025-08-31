//hooks
import { useState } from "react";

//libraries
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // Reset form fucntion
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTerms(false);
  };

  // Error fucntion
  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  // show success fucntion
  const showSuccess = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return showError("Password dont match");
    }

    // Get guest cart before registration
    const guestCart = JSON.parse(localStorage.getItem("guest-cart")) || [];

    const newUser = { email, password, firstname };

    // Get existing users or empty array
    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check for duplicate email
    const emailExists = existingUsers.some((user) => user.email === email);

    if (emailExists) {
      return showError("Email is already taken");
    }

    // Add new user
    existingUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    // Transfer guest cart to user's cart
    if (guestCart.length > 0) {
      localStorage.setItem(`cart-${email}`, JSON.stringify(guestCart));
      localStorage.removeItem("guest-cart");
    }

    // Show success
    showSuccess("Account created successfully");
    navigate("/login");
    resetForm();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0d1117] dark:text-[#f0f6fc] px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-[#161b22] shadow-xl rounded-2xl p-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Create an Account</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* first name */}
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  value={firstname}
                  type="text"
                  placeholder="John"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>

              {/* last namee */}
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  value={lastName}
                  type="text"
                  placeholder="Doe"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                value={email}
                type="email"
                placeholder="example@gmail.com"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="mt-1 w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {/* confirm password */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="mt-1 w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600 dark:text-gray-400"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <input
                checked={terms}
                type="checkbox"
                required
                className="accent-blue-600"
                onChange={(event) => setTerms(event.target.checked)}
              />
              <label>
                I agree to the{" "}
                <Link className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500">
                  Terms
                </Link>{" "}
                and{" "}
                <Link className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
