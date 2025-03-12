"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ConnectGmail() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)

    // Simulate Gmail connection
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/loading")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Connect Your Gmail</h1>
        <p className="text-gray-600">Connect your Gmail account to automatically extract and organize your receipts</p>

        <div className="py-8">
          <motion.div
            className="mx-auto h-32 w-32"
            animate={isConnecting ? { scale: [1, 0.9, 1.1, 1] } : {}}
            transition={{ repeat: isConnecting ? Number.POSITIVE_INFINITY : 0, duration: 2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
              <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
              <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
              <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
              <path
                fill="#c62828"
                d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
              />
              <path
                fill="#fbc02d"
                d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
              />
            </svg>
          </motion.div>
        </div>

        <Button onClick={handleConnect} className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Gmail"}
        </Button>

        <p className="mt-4 text-xs text-gray-500">
          We'll only access your receipt emails. Your data is secure and private.
        </p>
      </div>
    </div>
  )
}

