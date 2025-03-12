"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

// Mock receipt data that would come from your backend
const mockReceipts = [
  { id: 1, merchant: "Amazon", amount: 49.99, category: "shopping", date: "2023-05-15" },
  { id: 2, merchant: "Uber", amount: 24.5, category: "travel", date: "2023-05-14" },
  { id: 3, merchant: "Netflix", amount: 15.99, category: "entertainment", date: "2023-05-13" },
  { id: 4, merchant: "Starbucks", amount: 5.75, category: "food", date: "2023-05-12" },
  { id: 5, merchant: "H&M", amount: 89.95, category: "fashion", date: "2023-05-11" },
  { id: 6, merchant: "Airbnb", amount: 120.0, category: "travel", date: "2023-05-10" },
  { id: 7, merchant: "Apple", amount: 999.0, category: "tech", date: "2023-05-09" },
  { id: 8, merchant: "Whole Foods", amount: 65.32, category: "groceries", date: "2023-05-08" },
]

export default function Loading() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [loadedReceipts, setLoadedReceipts] = useState<typeof mockReceipts>([])
  const [currentMessage, setCurrentMessage] = useState("Connecting to Gmail...")

  useEffect(() => {
    const messages = [
      "Connecting to Gmail...",
      "Scanning for receipts...",
      "Extracting receipt data...",
      "Categorizing your purchases...",
      "Analyzing spending patterns...",
      "Almost done...",
    ]

    let messageIndex = 0
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setCurrentMessage(messages[messageIndex])
    }, 3000)

    // Simulate progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(Math.min(currentProgress, 100))

      // Add receipts gradually
      if (currentProgress % 12 === 0 && loadedReceipts.length < mockReceipts.length) {
        const nextIndex = loadedReceipts.length
        setLoadedReceipts((prev) => [...prev, mockReceipts[nextIndex]])
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        clearInterval(messageInterval)
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    }, 200)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [router, loadedReceipts.length])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-2xl space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Processing Your Receipts</h1>
          <p className="mt-2 text-gray-600">{currentMessage}</p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-right text-sm text-gray-500">{progress}% complete</p>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Discovered Receipts</h2>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
            <AnimatePresence>
              {loadedReceipts.map((receipt, index) => (
                <motion.div
                  key={receipt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between border-b border-gray-200 p-4 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{receipt.merchant}</p>
                    <p className="text-sm text-gray-500">
                      {receipt.category} • {receipt.date}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">${receipt.amount.toFixed(2)}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {loadedReceipts.length === 0 && (
              <div className="p-4 text-center text-gray-500">Searching for receipts...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

