"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function RequestOwnerAccess() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [form, setForm] = useState({
    pgName: "",
    pgAddress: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return alert("Please log in first");

    try {
      await addDoc(collection(db, "owner_requests"), {
        uid: user.uid,
        email: user.email,
        pgName: form.pgName,
        pgAddress: form.pgAddress,
        phone: form.phone,
        status: "pending",
        requestedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      alert("Request failed. Try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">Request Submitted 🎉</h2>
        <p className="mt-2">Our team will review and verify your request soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Owner Access Request</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pgName">PG Name</label>
          <input
            id="pgName"
            type="text"
            value={form.pgName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="pgAddress">PG Address</label>
          <input
            id="pgAddress"
            type="text"
            value={form.pgAddress}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
