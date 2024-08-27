"use client"

import { useState } from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white shadow-inner">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
