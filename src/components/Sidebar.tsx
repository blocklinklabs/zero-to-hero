import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Trash, Coins, MessageSquare, Settings, X } from "lucide-react"

const sidebarItems = [
  { href: "/report", icon: MapPin, label: "Report Waste" },
  { href: "/collect", icon: Trash, label: "Collect Waste" },
  { href: "/rewards", icon: Coins, label: "Rewards" },
  { href: "/messages", icon: MessageSquare, label: "Messages" },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside className={`bg-white text-gray-800 w-64 flex flex-col fixed inset-y-0 left-0 z-50 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:relative md:translate-x-0 shadow-lg`}>
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-lg font-semibold">Menu</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100" asChild onClick={onClose}>
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
      <div className="p-4">
        <Link href="/settings" passHref>
          <Button variant="outline" className="w-full text-gray-600 border-gray-300 hover:bg-gray-100" asChild onClick={onClose}>
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