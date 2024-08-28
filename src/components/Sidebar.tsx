import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { MapPin, Trash, Coins, MessageSquare, Settings, Home } from "lucide-react"

const sidebarItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/report", icon: MapPin, label: "Report Waste" },
  { href: "/collect", icon: Trash, label: "Collect Waste" },
  { href: "/rewards", icon: Coins, label: "Rewards" },
  { href: "/messages", icon: MessageSquare, label: "Messages" },
]

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={`bg-white border-r border-gray-200 text-gray-800 w-64 fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <nav className="flex-1 px-2 py-4 mt-16">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button 
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.href 
                      ? "bg-gray-200 text-gray-900" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`} 
                  asChild 
                >
                  <span>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link href="/settings" passHref>
          <Button 
            variant={pathname === "/settings" ? "secondary" : "outline"}
            className={`w-full ${
              pathname === "/settings"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`} 
            asChild 
          >
            <span>
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </span>
          </Button>
        </Link>
      </div>
    </aside>
  )
}