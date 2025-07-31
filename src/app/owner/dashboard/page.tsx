"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Users, Plus, Edit, Eye, CheckCircle, XCircle, Clock, IndianRupee, Upload } from "lucide-react"
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";



export default function OwnerDashboard() {
    const router = useRouter();
  const [selectedPG, setSelectedPG] = useState("pg-1")

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

  // Mock data
  const pgStats = {
    totalRooms: 24,
    occupiedRooms: 18,
    vacantRooms: 6,
    totalTenants: 18,
    monthlyRevenue: 45000,
    pendingPayments: 8500,
  }

  const rooms = [
    { id: "R001", type: "Single", rent: 8000, status: "occupied", tenant: "Rahul Kumar" },
    { id: "R002", type: "Double", rent: 6000, status: "occupied", tenant: "Priya Sharma" },
    { id: "R003", type: "Single", rent: 8000, status: "vacant", tenant: null },
    { id: "R004", type: "Triple", rent: 5000, status: "occupied", tenant: "Amit Singh" },
    { id: "R005", type: "Double", rent: 6000, status: "occupied", tenant: "Sneha Patel" },
    { id: "R006", type: "Single", rent: 8000, status: "vacant", tenant: null },
  ]

  const tenants = [
    {
      id: "T001",
      name: "Rahul Kumar",
      room: "R001",
      phone: "+91 9876543210",
      joinDate: "2024-01-15",
      rentStatus: "paid",
    },
    {
      id: "T002",
      name: "Priya Sharma",
      room: "R002",
      phone: "+91 9876543211",
      joinDate: "2024-02-01",
      rentStatus: "pending",
    },
    {
      id: "T003",
      name: "Amit Singh",
      room: "R004",
      phone: "+91 9876543212",
      joinDate: "2024-01-20",
      rentStatus: "paid",
    },
    {
      id: "T004",
      name: "Sneha Patel",
      room: "R005",
      phone: "+91 9876543213",
      joinDate: "2024-02-10",
      rentStatus: "overdue",
    },
  ]

  const laundrySlots = [
    { machine: "Machine 1", time: "09:00 AM", status: "available" },
    { machine: "Machine 1", time: "11:00 AM", status: "booked", tenant: "Rahul Kumar" },
    { machine: "Machine 1", time: "01:00 PM", status: "available" },
    { machine: "Machine 2", time: "09:00 AM", status: "booked", tenant: "Priya Sharma" },
    { machine: "Machine 2", time: "11:00 AM", status: "available" },
    { machine: "Machine 2", time: "01:00 PM", status: "maintenance" },
  ]

  return (
    <div className="space-y-6 m-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your PG operations efficiently</p>
        </div>
        <Button className="w-full sm:w-auto" variant="outline" onClick={handleLogout}>
            Log out
        </Button>
        <Select value={selectedPG} onValueChange={setSelectedPG}>
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pg-1">Sunrise PG - Koramangala</SelectItem>
            <SelectItem value="pg-2">Moonlight PG - BTM Layout</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold">{pgStats.totalRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-green-600">{pgStats.occupiedRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Vacant</p>
                <p className="text-2xl font-bold text-red-600">{pgStats.vacantRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold">{pgStats.totalTenants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">₹{pgStats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">₹{pgStats.pendingPayments.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="rooms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-16 lg:mb-0">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="rent">Rent Tracking</TabsTrigger>
          <TabsTrigger value="mess">Mess Menu</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="laundry">Laundry</TabsTrigger>
        </TabsList>

        {/* Rooms Tab */}
        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Room Management</CardTitle>
                  <CardDescription>Manage room occupancy and details</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Room</DialogTitle>
                      <DialogDescription>Create a new room in your PG</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="room-id" className="text-right">
                          Room ID
                        </Label>
                        <Input id="room-id" placeholder="R007" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="room-type" className="text-right">
                          Type
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="double">Double</SelectItem>
                            <SelectItem value="triple">Triple</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rent" className="text-right">
                          Rent
                        </Label>
                        <Input id="rent" placeholder="8000" type="number" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Room</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.id}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>₹{room.rent.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={room.status === "occupied" ? "default" : "secondary"}>{room.status}</Badge>
                      </TableCell>
                      <TableCell>{room.tenant || "-"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tenants Tab */}
        <TabsContent value="tenants" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tenant Management</CardTitle>
                  <CardDescription>Manage tenant information and details</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Tenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Tenant</DialogTitle>
                      <DialogDescription>Register a new tenant</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tenant-name" className="text-right">
                          Name
                        </Label>
                        <Input id="tenant-name" placeholder="Full Name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tenant-phone" className="text-right">
                          Phone
                        </Label>
                        <Input id="tenant-phone" placeholder="+91 9876543210" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tenant-room" className="text-right">
                          Room
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select room" />
                          </SelectTrigger>
                          <SelectContent>
                            {rooms
                              .filter((r) => r.status === "vacant")
                              .map((room) => (
                                <SelectItem key={room.id} value={room.id}>
                                  {room.id} - {room.type}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Tenant</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Rent Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.name}</TableCell>
                      <TableCell>{tenant.room}</TableCell>
                      <TableCell>{tenant.phone}</TableCell>
                      <TableCell>{tenant.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tenant.rentStatus === "paid"
                              ? "default"
                              : tenant.rentStatus === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {tenant.rentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rent Tracking Tab */}
        <TabsContent value="rent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Paid This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹36,500</p>
                <p className="text-sm text-gray-600">10 tenants</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹8,500</p>
                <p className="text-sm text-gray-600">3 tenants</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">₹6,000</p>
                <p className="text-sm text-gray-600">1 tenant</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Tracking</CardTitle>
              <CardDescription>Monitor rent payments and due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((tenant) => {
                    const room = rooms.find((r) => r.id === tenant.room)
                    return (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.room}</TableCell>
                        <TableCell>₹{room?.rent.toLocaleString()}</TableCell>
                        <TableCell>Jan 5, 2024</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tenant.rentStatus === "paid"
                                ? "default"
                                : tenant.rentStatus === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {tenant.rentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Send Reminder
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mess Menu Tab */}
        <TabsContent value="mess" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Today's Mess Menu</CardTitle>
                  <CardDescription>Upload and manage daily mess menu</CardDescription>
                </div>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Menu
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Breakfast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>• Poha with Peanuts</li>
                      <li>• Bread & Butter</li>
                      <li>• Tea/Coffee</li>
                      <li>• Banana</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lunch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>• Rice</li>
                      <li>• Dal Tadka</li>
                      <li>• Aloo Gobi</li>
                      <li>• Roti (2 pcs)</li>
                      <li>• Pickle & Papad</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dinner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>• Rice</li>
                      <li>• Rajma Curry</li>
                      <li>• Mixed Vegetables</li>
                      <li>• Roti (3 pcs)</li>
                      <li>• Curd</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Post announcements to all tenants</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Announcement</DialogTitle>
                      <DialogDescription>Send a message to all tenants</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" placeholder="Announcement title" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="message" className="text-right">
                          Message
                        </Label>
                        <Textarea id="message" placeholder="Type your message here..." className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Send Announcement</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Water Supply Maintenance</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance work.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Posted on Jan 15, 2024</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Rent Due Reminder</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Monthly rent is due by 5th of every month. Please ensure timely payment.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Posted on Jan 1, 2024</p>
                      </div>
                      <Badge variant="secondary">Archived</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Laundry Tab */}
        <TabsContent value="laundry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laundry Management</CardTitle>
              <CardDescription>Monitor washing machine availability and bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Machine 1</h4>
                  <div className="space-y-2">
                    {laundrySlots
                      .filter((slot) => slot.machine === "Machine 1")
                      .map((slot, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">{slot.time}</span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                slot.status === "available"
                                  ? "secondary"
                                  : slot.status === "booked"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {slot.status}
                            </Badge>
                            {slot.tenant && <span className="text-xs text-gray-600">{slot.tenant}</span>}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Machine 2</h4>
                  <div className="space-y-2">
                    {laundrySlots
                      .filter((slot) => slot.machine === "Machine 2")
                      .map((slot, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">{slot.time}</span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                slot.status === "available"
                                  ? "secondary"
                                  : slot.status === "booked"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {slot.status}
                            </Badge>
                            {slot.tenant && <span className="text-xs text-gray-600">{slot.tenant}</span>}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
