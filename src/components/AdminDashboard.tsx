import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Package, Users, IndianRupee, Clock, Phone, MapPin, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Order {
  id: string;
  customerName: string;
  mobile: string;
  address: string;
  items: Array<{
    name: string;
    quantity: string;
    price: number;
  }>;
  total: number;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "delivered";
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "Rajesh Kumar",
    mobile: "9876543210",
    address: "123 MG Road, Bangalore, Karnataka - 560001",
    items: [
      { name: "Premium Almonds", quantity: "500g", price: 450 },
      { name: "Cashews", quantity: "250g", price: 300 }
    ],
    total: 750,
    date: "2024-01-15",
    time: "14:30",
    status: "confirmed"
  },
  {
    id: "ORD002",
    customerName: "Priya Sharma",
    mobile: "8765432109",
    address: "456 Park Street, Delhi, Delhi - 110001",
    items: [
      { name: "Mixed Dry Fruits", quantity: "1kg", price: 800 }
    ],
    total: 800,
    date: "2024-01-14",
    time: "16:45",
    status: "pending"
  },
  {
    id: "ORD003",
    customerName: "Amit Patel",
    mobile: "7654321098",
    address: "789 Station Road, Mumbai, Maharashtra - 400001",
    items: [
      { name: "Pistachios", quantity: "250g", price: 400 },
      { name: "Walnuts", quantity: "500g", price: 600 },
      { name: "Dates", quantity: "250g", price: 200 }
    ],
    total: 1200,
    date: "2024-01-13",
    time: "11:20",
    status: "delivered"
  },
  {
    id: "ORD004",
    customerName: "Sneha Reddy",
    mobile: "6543210987",
    address: "321 Temple Street, Chennai, Tamil Nadu - 600001",
    items: [
      { name: "Raisins", quantity: "500g", price: 250 },
      { name: "Apricots", quantity: "250g", price: 350 }
    ],
    total: 600,
    date: "2024-01-12",
    time: "09:15",
    status: "confirmed"
  }
];

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [orders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    onLogout();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your dry fruits store orders</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Manage and track all customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {order.mobile}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₹{order.total}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{order.date}</div>
                          <div className="text-muted-foreground">{order.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(order.status)}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                              <DialogDescription>
                                Complete order information and customer details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div>
                                <h3 className="font-semibold mb-3">Customer Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <label className="font-medium">Name:</label>
                                    <p>{order.customerName}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Mobile:</label>
                                    <p>{order.mobile}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="font-medium">Address:</label>
                                    <p className="flex items-start">
                                      <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                                      {order.address}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div>
                                <h3 className="font-semibold mb-3">Order Items</h3>
                                <div className="space-y-2">
                                  {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                      <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                      </div>
                                      <p className="font-semibold">₹{item.price}</p>
                                    </div>
                                  ))}
                                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg font-semibold">
                                    <span>Total Amount</span>
                                    <span>₹{order.total}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Order Status */}
                              <div>
                                <h3 className="font-semibold mb-3">Order Status</h3>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Current Status</p>
                                    <Badge className={getStatusColor(order.status)}>
                                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Order Date</p>
                                    <p className="font-medium">{order.date} at {order.time}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;