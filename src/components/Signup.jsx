import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Logo, Input, Button } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const newUser = await authService.createUser(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      setError(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-md">
        
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
          Sign up for an account
        </h2>

        {/* Login Link */}
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 dark:text-red-400 mt-4 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          {/* Full Name */}
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register("name", { required: "Full Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

          {/* Email */}
          <Input
            type="email"
            label="Email:"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          {/* Password */}
          <Input
            type="password"
            label="Password:"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full py-3 text-lg">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
