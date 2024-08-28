import { useState } from "react"
import Link from "next/link"
import { Menu, Coins, Leaf, Search, Bell, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onMenuClick: () => void
  totalEarnings: number
}

export default function Header({ onMenuClick, totalEarnings }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-green-500 mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800">Zero2Hero</span>
              <span className="text-[10px] text-gray-500 -mt-1">ETH Global 24</span>
            </div>
          </Link>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="mr-4 flex items-center bg-gray-100 rounded-full px-3 py-1">
            <Coins className="h-5 w-5 mr-1 text-green-500" />
            <span className="font-semibold text-gray-800">{totalEarnings.toFixed(2)}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="flex items-center">
                <User className="h-5 w-5 mr-1" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}