import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Check if user is authenticated - in a real app, this would use a server component
  // or client-side auth check
  const isAuthenticated = false

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Receiptor AI</h1>
          <p className="mt-2 text-sm text-gray-600">Organize your receipts automatically with AI</p>
        </div>

        <div className="mt-8 space-y-4">
          <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50">
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>

        <div className="mt-6">
          <p className="text-center text-xs text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </main>
  )
}

