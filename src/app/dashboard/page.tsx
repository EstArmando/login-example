"use client"
import { signOut } from "next-auth/react";

function Dashboard() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div className="space-y-2">
        <h1 className="text-white text-5xl">Dashboard</h1>
        <button
          className="bg-white text-black p-2 rounded"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
