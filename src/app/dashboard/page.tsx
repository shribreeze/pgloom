"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import DashboardLayout from "../dashboard-layout/page";
import OwnerDashboard from "../owner/dashboard/page";
import TenantDashboard from "../tenant/dashboard/page";

export default function HomePage() {
  const [role, setUserRole] = useState<"owner" | "tenant" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/";
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.data();
      if (data?.role === "owner") setUserRole("owner");
      else setUserRole("tenant");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || role === null) {
    return <p className="text-center mt-10">Loading your dashboard...</p>;
  }

  return (
    <DashboardLayout userRole={role} onRoleChange={setUserRole}>
      {role === "tenant" ? <TenantDashboard /> : <OwnerDashboard />}
    </DashboardLayout>
  );
}
