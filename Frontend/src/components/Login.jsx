import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ mode: "onChange" makes error messages clear as soon as you type
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Logged in Successfully");
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
          }, 500);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error! Incorrect email or password");
        }
      });
  };

  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>

              <h3 className="font-bold text-2xl text-center mb-4">Login</h3>

              {/* Email */}
              <div className="mt-2">
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
                  })}
                />
                {/* 👁️ Toggle Button */}
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

              {/* Button */}
              <div className="flex flex-col items-center mt-6 space-y-2">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md px-4 py-2 hover:from-pink-600 hover:to-purple-600 hover:scale-105 transition-all duration-300">
                  Login
                </button>
                <p className="text-gray-600 text-md">
                  Not registered?{" "}
                  <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Login;
