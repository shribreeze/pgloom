"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const monthlyPlans = [
  {
    name: "Basic",
    price: 499,
    features: ["1 PG Listing", "Tenant Chat", "Laundry Tracking"],
    highlight: false,
  },
  {
    name: "Premium",
    price: 1499,
    features: [
      "Unlimited Listings",
      "Real-Time Orders",
      "Analytics Dashboard",
      "Priority Support",
    ],
    highlight: true,
  },
];

const yearlyPlans = [
  {
    name: "Basic",
    price: 4999,
    features: ["1 PG Listing", "Tenant Chat", "Laundry Tracking"],
    highlight: false,
  },
  {
    name: "Premium",
    price: 14999,
    features: [
      "Unlimited Listings",
      "Real-Time Orders",
      "Analytics Dashboard",
      "Priority Support",
    ],
    highlight: true,
  },
];

export default function PricingComponent() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const plans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans;

  return (
    <section className="bg-neutral-950 py-20 px-4">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Transparent Pricing
        </h2>
        <p className="mt-4 text-neutral-400 text-lg">
          Choose a plan that fits your PG needs — no hidden charges.
        </p>
        {/* Toggle Switch */}
        <div className="mt-6 inline-flex items-center justify-center space-x-4">
          <span className="text-neutral-400">Monthly</span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
            }
            className={cn(
              "bg-neutral-800 w-14 h-7 rounded-full p-1 transition-colors duration-300",
              billingCycle === "yearly" && "bg-teal-600"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300",
                billingCycle === "yearly" ? "translate-x-7" : "translate-x-0"
              )}
            />
          </button>
          <span className="text-neutral-400">Yearly</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div
              className={cn(
                "relative rounded-3xl p-8 bg-neutral-900 border border-neutral-800 text-white shadow-xl overflow-hidden transition group hover:scale-[1.015] hover:shadow-[0_0_30px_#00ffe0aa]",
                plan.highlight && "border-blue-500/50"
              )}
            >
              {/* Glowing Gradient */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-20 blur-2xl bg-gradient-to-tr from-blue-500 via-yellow-400 to-pink-500 z-0 group-hover:opacity-40 transition-all" />

              {/* MOST POPULAR Badge */}
              {plan.highlight && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-pink-500 text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  MOST POPULAR
                </div>
              )}

              <div className="relative z-10">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4 text-4xl font-extrabold text-yellow-400">
                  ₹{plan.price}
                  <span className="text-base text-neutral-400 ml-2">
                    /{billingCycle}
                  </span>
                </p>

                <ul className="mt-6 space-y-2 text-neutral-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-400">✔</span> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-8 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-yellow-400 to-pink-500 text-neutral-950 font-semibold shadow-md hover:shadow-yellow-500/30 transition-all"
                  onClick={() => alert(`Redirect to Razorpay for ${plan.name}`)}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
