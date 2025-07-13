"use client"

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
import {
  Home,
  CreditCard,
  MessageSquare,
  WashingMachineIcon as Washing,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react"
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function TenantDashboard() {
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
  // Mock data for tenant
  const tenantInfo = {
    name: "Jane Smith",
    room: "R002",
    pgName: "Sunrise PG - Koramangala",
    joinDate: "2024-02-01",
    rentAmount: 6000,
    rentStatus: "pending",
    dueDate: "2024-02-05",
  }

  const paymentHistory = [
    { month: "January 2024", amount: 6000, status: "paid", date: "2024-01-03" },
    { month: "December 2023", amount: 6000, status: "paid", date: "2023-12-05" },
    { month: "November 2023", amount: 6000, status: "paid", date: "2023-11-02" },
  ]

  const complaints = [
    {
      id: "C001",
      title: "AC not working",
      status: "in-progress",
      date: "2024-01-20",
      description: "Air conditioner in room R002 is not cooling properly",
    },
    {
      id: "C002",
      title: "WiFi connectivity issue",
      status: "resolved",
      date: "2024-01-15",
      description: "Internet connection is very slow",
    },
  ]

  const laundrySlots = [
    { machine: "Machine 1", time: "09:00 AM", status: "available" },
    { machine: "Machine 1", time: "11:00 AM", status: "booked", tenant: "You" },
    { machine: "Machine 1", time: "01:00 PM", status: "available" },
    { machine: "Machine 2", time: "09:00 AM", status: "booked", tenant: "Rahul Kumar" },
    { machine: "Machine 2", time: "11:00 AM", status: "available" },
    { machine: "Machine 2", time: "01:00 PM", status: "maintenance" },
  ]

  const announcements = [
    {
      title: "Water Supply Maintenance",
      message: "Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance work.",
      date: "Jan 15, 2024",
      priority: "high",
    },
    {
      title: "Rent Due Reminder",
      message: "Monthly rent is due by 5th of every month. Please ensure timely payment.",
      date: "Jan 1, 2024",
      priority: "normal",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between sm:items-start sm:flex-row flex-col space-y-4 sm:space-y-0">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {tenantInfo.name}!</h1>
            <p className="text-gray-600">
            {tenantInfo.pgName} • Room {tenantInfo.room}
            </p>
        </div>
        <Button className="w-full sm:w-auto" variant="outline" onClick={handleLogout}>
            Log out
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Room</p>
                <p className="text-2xl font-bold">{tenantInfo.room}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                <p className="text-2xl font-bold">₹{tenantInfo.rentAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Rent Status</p>
                <Badge variant={tenantInfo.rentStatus === "paid" ? "default" : "secondary"}>
                  {tenantInfo.rentStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Due Date</p>
                <p className="text-lg font-bold">{tenantInfo.dueDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rent">Rent Status</TabsTrigger>
          <TabsTrigger value="mess">Mess Menu</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="laundry">Laundry</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>PG Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">PG Name:</span>
                  <span className="font-medium">{tenantInfo.pgName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Number:</span>
                  <span className="font-medium">{tenantInfo.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium">Double Sharing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Date:</span>
                  <span className="font-medium">{tenantInfo.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="font-medium">₹{tenantInfo.rentAmount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Rent
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Submit Complaint
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Complaint</DialogTitle>
                      <DialogDescription>Describe your issue and we'll address it promptly</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="complaint-title" className="text-right">
                          Title
                        </Label>
                        <Input id="complaint-title" placeholder="Brief description" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="complaint-desc" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="complaint-desc"
                          placeholder="Detailed description of the issue"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Priority
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Complaint</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Washing className="mr-2 h-4 w-4" />
                  Book Laundry
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.slice(0, 2).map((announcement, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rent Status Tab */}
        <TabsContent value="rent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Amount Due:</span>
                  <span className="text-2xl font-bold">₹{tenantInfo.rentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Due Date:</span>
                  <span className="font-medium">{tenantInfo.dueDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <Badge variant={tenantInfo.rentStatus === "paid" ? "default" : "secondary"}>
                    {tenantInfo.rentStatus}
                  </Badge>
                </div>
                <Button className="w-full" disabled={tenantInfo.rentStatus === "paid"}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {tenantInfo.rentStatus === "paid" ? "Paid" : "Pay Now"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span>₹{tenantInfo.rentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit:</span>
                  <span>₹{(tenantInfo.rentAmount * 2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance:</span>
                  <span>₹500</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total Monthly:</span>
                  <span>₹{(tenantInfo.rentAmount + 500).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{payment.month}</TableCell>
                      <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mess Menu Tab */}
        <TabsContent value="mess" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Menu</CardTitle>
              <CardDescription>Fresh meals prepared daily</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Breakfast</CardTitle>
                    <CardDescription>7:00 AM - 9:00 AM</CardDescription>
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
                    <CardDescription>12:00 PM - 2:00 PM</CardDescription>
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
                    <CardDescription>7:00 PM - 9:00 PM</CardDescription>
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

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>Track your submitted complaints and requests</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Complaint
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit New Complaint</DialogTitle>
                      <DialogDescription>Describe your issue in detail</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" placeholder="Brief description" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea id="description" placeholder="Detailed description" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Priority
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit Complaint</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <Card key={complaint.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{complaint.title}</h4>
                        <Badge variant={complaint.status === "resolved" ? "default" : "secondary"}>
                          {complaint.status === "in-progress" ? (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              In Progress
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Resolved
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>ID: {complaint.id}</span>
                        <span>Submitted: {complaint.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Laundry Tab */}
        <TabsContent value="laundry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laundry Booking</CardTitle>
              <CardDescription>Book washing machine slots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Machine 1</h4>
                  <div className="space-y-2">
                    {laundrySlots
                      .filter((slot) => slot.machine === "Machine 1")
                      .map((slot, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <span className="font-medium">{slot.time}</span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                slot.status === "available"
                                  ? "secondary"
                                  : slot.status === "booked" && slot.tenant === "You"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {slot.status === "booked" && slot.tenant === "You" ? "Your Booking" : slot.status}
                            </Badge>
                            {slot.status === "available" && <Button size="sm">Book</Button>}
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
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <span className="font-medium">{slot.time}</span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                slot.status === "available"
                                  ? "secondary"
                                  : slot.status === "booked"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {slot.status}
                            </Badge>
                            {slot.status === "available" && <Button size="sm">Book</Button>}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Important updates from management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"}>
                          {announcement.priority === "high" ? (
                            <>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              High Priority
                            </>
                          ) : (
                            <>
                              <Bell className="w-3 h-3 mr-1" />
                              Normal
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                      <p className="text-xs text-gray-500">{announcement.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
