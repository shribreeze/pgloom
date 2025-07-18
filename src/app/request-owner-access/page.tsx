"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RequestOwnerAccess() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [form, setForm] = useState({
    pgName: "",
    pgAddress: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      setError("Request failed. Try again later.");
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Request Submitted 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your request has been submitted. Our team will review and verify your details shortly.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Owner Access Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="pgName">PG Name</Label>
            <Input
              id="pgName"
              placeholder="Sunrise PG"
              type="text"
              value={form.pgName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pgAddress">PG Address</Label>
            <Input
              id="pgAddress"
              placeholder="Koramangala, Bangalore"
              type="text"
              value={form.pgAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="9876543210"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
