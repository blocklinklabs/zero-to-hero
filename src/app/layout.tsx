"use client"

import { useState } from "react"
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import 'leaflet/dist/leaflet.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [totalEarnings, setTotalEarnings] = useState(1250.75)

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} totalEarnings={totalEarnings} />
          <div className="flex flex-1">
            <Sidebar open={sidebarOpen} />
            <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
