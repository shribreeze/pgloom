"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";

import { auth, db, provider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // Save user info to Firestore with default role = tenant/owner
      await setDoc(doc(db, "users", user.uid), {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        role: "owner", // default role for signup
      });

      router.push("/owner/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // New Google user: add to Firestore
        await setDoc(userDocRef, {
          firstname: user.displayName?.split(" ")[0] || "",
          lastname: user.displayName?.split(" ")[1] || "",
          email: user.email,
          role: "owner",
        });
        router.push("/owner/dashboard");
      } else {
        const role = userDoc.data()?.role;
        if (role === "tenant") router.push("/tenant/dashboard");
        else router.push("/owner/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] shadow-2xl mx-auto w-full max-w-md rounded-sm p-1 md:rounded-2xl md:p-1 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]">
      <div className="relative z-10 rounded-sm md:rounded-2xl bg-black p-4 md:p-8">
      <h2 className="text-xl font-bold text-neutral-200 dark:text-neutral-200">
        Welcome to PGLoom
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300 dark:text-neutral-300">
        Sign up to access your dashboard
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Sameer"
              type="text"
              value={form.firstname}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Gautam"
              type="text"
              value={form.lastname}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectshribreeze@fc.com"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full cursor-pointer rounded-md bg-zinc-800 from-zinc-900 to-zinc-900 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"          
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group/btn shadow-input relative flex h-10 w-full cursor-pointer items-center justify-start space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-black dark:bg-zinc-900"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300 dark:text-neutral-300" />
            <span className="text-sm text-neutral-300 dark:text-neutral-300">
              Sign in with Google
            </span>
            <BottomGradient />
          </button>
        </div>
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent dark:via-neutral-700" />
                
        <p className="mt-2 max-w-sm text-sm text-neutral-300 dark:text-neutral-300">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 underline hover:text-blue-800">Sign In</Link>
        </p>

        <p className="mt-4 text-sm text-neutral-300 dark:text-neutral-300">
          Want to register as a Tenant?{" "}
            <Link
              href="/tenant-signup"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Register here
            </Link>
        </p>
      </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
