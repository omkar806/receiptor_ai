"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ShoppingBag,
  Plane,
  Coffee,
  ShoppingCart,
  Monitor,
  Home,
  Settings,
  LogOut,
  Search,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpendingChart } from "@/components/spending-chart"

// Mock data that would come from your Supabase DB
const mockCategories = [
  { id: "fashion", name: "Fashion", icon: ShoppingBag, count: 12, total: 1245.67 },
  { id: "travel", name: "Travel", icon: Plane, count: 8, total: 2340.5 },
  { id: "food", name: "Food & Drinks", icon: Coffee, count: 24, total: 567.89 },
  { id: "groceries", name: "Groceries", icon: ShoppingCart, count: 18, total: 890.45 },
  { id: "tech", name: "Technology", icon: Monitor, count: 6, total: 3456.78 },
]

const mockReceipts = [
  {
    id: 1,
    merchant: "Zara",
    amount: 89.95,
    category: "fashion",
    date: "2023-05-15",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    merchant: "H&M",
    amount: 45.99,
    category: "fashion",
    date: "2023-05-10",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    merchant: "Delta Airlines",
    amount: 450.0,
    category: "travel",
    date: "2023-05-08",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    merchant: "Airbnb",
    amount: 320.5,
    category: "travel",
    date: "2023-05-05",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    merchant: "Starbucks",
    amount: 5.75,
    category: "food",
    date: "2023-05-14",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 6,
    merchant: "Chipotle",
    amount: 12.99,
    category: "food",
    date: "2023-05-12",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 7,
    merchant: "Whole Foods",
    amount: 89.45,
    category: "groceries",
    date: "2023-05-11",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 8,
    merchant: "Trader Joe's",
    amount: 65.32,
    category: "groceries",
    date: "2023-05-09",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 9,
    merchant: "Apple",
    amount: 999.0,
    category: "tech",
    date: "2023-05-07",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 10,
    merchant: "Best Buy",
    amount: 249.99,
    category: "tech",
    date: "2023-05-03",
    image: "/placeholder.svg?height=60&width=60",
  },
]

// Calculate spending data for the chart
const calculateSpendingData = () => {
  const totalSpending = mockCategories.reduce((sum, category) => sum + category.total, 0)

  return mockCategories.map((category) => ({
    name: category.name,
    value: Math.round((category.total / totalSpending) * 100),
    color: getCategoryColor(category.id),
  }))
}

// Get color for category
function getCategoryColor(categoryId: string) {
  const colors: Record<string, string> = {
    fashion: "#8884d8",
    travel: "#82ca9d",
    food: "#ffc658",
    groceries: "#ff8042",
    tech: "#0088fe",
  }

  return colors[categoryId] || "#cccccc"
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [filteredReceipts, setFilteredReceipts] = useState(mockReceipts)
  const [searchQuery, setSearchQuery] = useState("")
  const [spendingData, setSpendingData] = useState(calculateSpendingData())

  // Filter receipts based on active tab and search query
  useEffect(() => {
    let filtered = mockReceipts

    if (activeTab !== "all") {
      filtered = filtered.filter((receipt) => receipt.category === activeTab)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (receipt) => receipt.merchant.toLowerCase().includes(query) || receipt.category.toLowerCase().includes(query),
      )
    }

    setFilteredReceipts(filtered)
  }, [activeTab, searchQuery])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden w-64 flex-shrink-0 flex-col bg-white p-4 shadow-md md:flex">
        <div className="mb-8 flex items-center space-x-2">
          <div className="rounded-md bg-indigo-600 p-2 text-white">
            <ShoppingBag size={20} />
          </div>
          <h1 className="text-xl font-bold">Receiptor AI</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </Button>

          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setActiveTab(category.id)}
            >
              <category.icon className="mr-2 h-5 w-5" />
              {category.name}
              <span className="ml-auto rounded-full bg-gray-100 px-2 py-1 text-xs">{category.count}</span>
            </Button>
          ))}
        </nav>

        <div className="mt-auto pt-4">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search receipts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="ml-4 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Receipts Dashboard</h1>
            <p className="text-gray-600">Track and manage all your receipts in one place</p>
          </div>

          {/* Stats cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Receipts</CardTitle>
                <CardDescription className="text-2xl font-bold text-gray-900">{mockReceipts.length}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Spent</CardTitle>
                <CardDescription className="text-2xl font-bold text-gray-900">
                  ${mockReceipts.reduce((sum, receipt) => sum + receipt.amount, 0).toFixed(2)}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Categories</CardTitle>
                <CardDescription className="text-2xl font-bold text-gray-900">{mockCategories.length}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Spending chart */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <SpendingChart data={spendingData} />
              </CardContent>
            </Card>

            {/* Receipts list */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Receipts</CardTitle>
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {mockCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReceipts.length > 0 ? (
                    filteredReceipts.map((receipt) => (
                      <div
                        key={receipt.id}
                        className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                        onClick={() => {
                          /* Navigate to receipt detail */
                        }}
                      >
                        <div className="mr-4 h-12 w-12 overflow-hidden rounded-md">
                          <img
                            src={receipt.image || "/placeholder.svg"}
                            alt={receipt.merchant}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{receipt.merchant}</h3>
                          <p className="text-sm text-gray-500">
                            {receipt.date} • {receipt.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${receipt.amount.toFixed(2)}</p>
                          <div
                            className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs"
                            style={{
                              backgroundColor: `${getCategoryColor(receipt.category)}20`,
                              color: getCategoryColor(receipt.category),
                            }}
                          >
                            {receipt.category}
                          </div>
                        </div>
                        <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">No receipts found matching your criteria</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

