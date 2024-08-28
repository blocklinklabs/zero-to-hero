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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white shadow-inner">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
