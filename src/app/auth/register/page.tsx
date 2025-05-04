"use client";
import { User } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type UserForm = Pick<User, "username" | "email" | "password"> & {
  confirmPassword: string;
};

function RegisterPage() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserForm>();

  const onSubmit = async (data: UserForm) => {
    if (data.password !== data.confirmPassword) {
      return setError("confirmPassword", {
        message: "Confirm password must be the same as password",
      });
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        push("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Username"
        />
        {errors.username ? (
          <span className="text-red-500 text-xs">{`${errors.username.message}`}</span>
        ) : null}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          placeholder="Email"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email ? (
          <span className="text-red-500 text-xs">{`${errors.email.message}`}</span>
        ) : null}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          placeholder="Password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password ? (
          <span className="text-red-500 text-xs">{`${errors.password.message}`}</span>
        ) : null}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm password is required",
            },
          })}
          placeholder="Confirm password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.confirmPassword ? (
          <span className="text-red-500 text-xs">{`${errors.confirmPassword.message}`}</span>
        ) : null}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 mt-2 cursor-pointer rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
