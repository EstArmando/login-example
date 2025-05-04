"use client";

import { User } from "@/generated/prisma";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginForm = Pick<User, "email" | "password">;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        router.push("/dashboard");
        router.refresh()
      } else {
        setError(response?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form className="w-1/4" onSubmit={handleSubmit(onSubmit)}>
        {error ? (
          <p className="w-full bg-red-500 text-lg text-white font-semibold p-3 text-center my-3">
            {error}
          </p>
        ) : null}
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="example@email.com"
        />
        {errors.email ? (
          <span className="text-red-500 text-xs">{`${errors.email.message}`}</span>
        ) : null}

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
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
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="******"
        />
        {errors.password ? (
          <span className="text-red-500 text-xs">{`${errors.password.message}`}</span>
        ) : null}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 mt-2 cursor-pointer rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
