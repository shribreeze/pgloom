"use client"

import type React from "react"

import { useState } from "react"
import {
  Building2,
  Users,
  CreditCard,
  ChefHat,
  Megaphone,
  WashingMachineIcon as Washing,
  Settings,
  Home,
  Receipt,
  MessageSquare,
  Bell,
  User,
  LogOut,
  Menu,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "owner" | "tenant"
  onRoleChange: (role: "owner" | "tenant") => void
}

const ownerNavItems = [
  { icon: Building2, label: "PG Management", id: "pg-management" },
  { icon: Users, label: "Tenants", id: "tenants" },
  { icon: CreditCard, label: "Rent Tracking", id: "rent-tracking" },
  { icon: ChefHat, label: "Mess Menu", id: "mess-menu" },
  { icon: Megaphone, label: "Announcements", id: "announcements" },
  { icon: Washing, label: "Laundry", id: "laundry" },
  { icon: Receipt, label: "Payments", id: "payments" },
  { icon: Settings, label: "Settings", id: "settings" },
]

const tenantNavItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Receipt, label: "Rent Status", id: "rent-status" },
  { icon: ChefHat, label: "Mess Menu", id: "mess-menu" },
  { icon: MessageSquare, label: "Complaints", id: "complaints" },
  { icon: Washing, label: "Laundry", id: "laundry" },
  { icon: Bell, label: "Announcements", id: "announcements" },
]

export default function DashboardLayout({ children, userRole, onRoleChange }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState(userRole === "owner" ? "pg-management" : "dashboard")
  const navItems = userRole === "owner" ? ownerNavItems : tenantNavItems

  const router = useRouter();
      
  
      const handleLogout = async () => {
        try {
          await signOut(auth);
          alert("Logged out successfully");
          router.push("/");
        } catch (error) {
          console.error("Logout error:", error);
          alert("Failed to logout. Try again.");
        }
      };

  const Sidebar = () => (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Building2 className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">PGLoom</span>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <div className="px-3 mb-4">
          <Badge variant={userRole === "owner" ? "default" : "secondary"} className="w-full justify-center">
            {userRole === "owner" ? (
              <>
                <Shield className="w-3 h-3 mr-1" />
                Owner
              </>
            ) : (
              <>
                <User className="w-3 h-3 mr-1" />
                Tenant
              </>
            )}
          </Badge>
        </div>

        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{userRole === "owner" ? "OW" : "TN"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{userRole === "owner" ? "John Doe" : "Jane Smith"}</span>
                <span className="text-xs text-muted-foreground">{userRole === "owner" ? "Owner" : "Tenant"}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 items-center gap-4 border-b bg-white px-6 lg:hidden">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">PGLoom</span>
          </header>

          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>

        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}
