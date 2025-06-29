import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation runs onChange to instantly clear errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px] bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-2xl mb-4 text-center">Signup</h3>

            {/* Fullname */}
            <div className="mt-2">
              <label className="block mb-1 text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className={`w-full px-3 py-2 border rounded-md outline-none ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                }`}
                {...register("fullname", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">{errors.fullname.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded-md outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 relative">
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-md outline-none pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                    message:
                      "Must contain uppercase, lowercase, number & special character",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-[38px] text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>

            {/* Submit & Login */}
            <div className="flex flex-col items-center mt-6 space-y-2">
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md px-4 py-2 hover:from-pink-600 hover:to-purple-600 hover:scale-105 transition-all duration-300">
                Signup
              </button>
              <p className="text-md text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
          <Login />
        </div>
      </div>
    </>
  );
}

export default Signup;
