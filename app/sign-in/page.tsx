"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../action/auth";
const SignInPage = () => {
  async function onSubmit(formData: FormData) {
    await signIn(formData);
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        action={onSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-center text-2xl font-bold">Login Page</h1>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
            <input
              name="email"
              type="email"
              placeholder="email"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700" htmlFor="password">
            Password
            <input
              name="password"
              type="password"
              placeholder="password"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default SignInPage;
