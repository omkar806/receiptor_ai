"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, Trash2 } from "lucide-react"

// Mock receipt data that would come from your Supabase DB
const mockReceipts = [
  {
    id: "1",
    merchant: "Zara",
    amount: 89.95,
    category: "fashion",
    date: "2023-05-15",
    image: "/placeholder.svg?height=300&width=400",
    items: [
      { name: "Slim Fit Jeans", price: 49.95, quantity: 1 },
      { name: "Cotton T-Shirt", price: 19.95, quantity: 2 },
    ],
    paymentMethod: "Visa ending in 4242",
    orderNumber: "ZAR-12345-67890",
  },
  // More receipts would be here
]

export default function ReceiptDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  // Find the receipt by ID
  const receipt = mockReceipts.find((r) => r.id === id) || mockReceipts[0] // Fallback to first receipt for demo

  // Calculate subtotal
  const subtotal = receipt.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // Assuming 8% tax

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-4 flex items-center text-gray-600" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Receipt Details</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Receipt Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={receipt.image || "/placeholder.svg"}
                  alt={`Receipt from ${receipt.merchant}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receipt Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Merchant</h3>
                <p className="text-lg font-semibold text-gray-900">{receipt.merchant}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-gray-900">{receipt.date}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                <p className="text-gray-900">{receipt.paymentMethod}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                <p className="text-gray-900">{receipt.orderNumber}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Items</h3>
                <div className="rounded-md border border-gray-200">
                  <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 p-2 text-xs font-medium text-gray-500">
                    <div>Item</div>
                    <div className="text-center">Qty</div>
                    <div className="text-right">Price</div>
                  </div>
                  {receipt.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 border-b border-gray-200 p-2 text-sm last:border-0">
                      <div>{item.name}</div>
                      <div className="text-center">{item.quantity}</div>
                      <div className="text-right">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 rounded-md bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
                  <span>Total</span>
                  <span>${receipt.amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

