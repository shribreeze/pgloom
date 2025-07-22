"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { HeroHighlightMain } from "./HeroHighlightMain";
import Link from "next/link";
import { Building, CalendarCheck, UserCheck, BedDouble, Shirt } from "lucide-react";
import PricingComponent from "./PricingComponent";
import Contact from "./Contact";

export function NavbarMain() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-neutral-950 text-white">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <NavbarButton as="a" variant="secondary" className="text-neutral-300">Login</NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-300 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <MainContent />
    </div>
  );
}

const features = [
  {
    id: 1,
    icon: <Building className="w-8 h-8 text-indigo-400 dark:text-indigo-400" />,
    title: "PG Listings & Booking",
    desc: "Explore verified PGs, check amenities, and book instantly online.",
  },
  {
    id: 2,
    icon: <CalendarCheck className="w-8 h-8 text-green-400 dark:text-green-400" />,
    title: "Rent & Routine Management",
    desc: "Track rent, receive reminders, and manage your PG life with ease.",
  },
  {
    id: 3,
    icon: <UserCheck className="w-8 h-8 text-yellow-400 dark:text-yellow-400" />,
    title: "Owner Dashboard",
    desc: "PG Owners can manage rooms, tenants, menus, and more in real-time.",
  },
  {
    id: 4,
    icon: <BedDouble className="w-8 h-8 text-pink-400 dark:text-pink-400" />,
    title: "Room Allocation",
    desc: "Seamlessly assign, reassign or remove tenants from rooms.",
  },
  {
    id: 5,
    icon: <Shirt className="w-8 h-8 text-blue-400 dark:text-blue-400" />,
    title: "Laundry Booking",
    desc: "Tenants can book laundry slots online—automated, fast, and easy.",
  },
];

const MainContent = () => {
  return (
    <div className="bg-neutral-950 text-white container mx-auto px-4 pt-20 md:pt-24 pb-12">
      
      <HeroHighlightMain />

      <div className="mt-20 scroll-mt-32" id="features">
        <h2 className="text-3xl font-bold text-center text-white dark:text-white">
          Why Choose <span className="text-indigo-600">PGLoom</span>?
        </h2>
        <p className="mt-2 text-center text-neutral-400 dark:text-neutral-400 max-w-xl mx-auto">
          Everything you need to manage or stay in a PG — Rent. Room. Routine. Sorted.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-neutral-900 dark:bg-neutral-900 p-6 shadow hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-text-white dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-neutral-400 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="pricing" className="mt-8 scroll-mt-10 md:mt-12">
        <PricingComponent />
      </div>
      <div id="contact" className="scroll-mt-10">
        <Contact  />
      </div>
    </div>
  );
};