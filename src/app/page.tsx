'use client'
import { ArrowRight, Leaf, Recycle, Users, Coins, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({ 
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  return (
    <div className={`container mx-auto px-4 py-16 ${poppins.className}`}>
      <header className="text-center mb-20">
        <h1 className="text-6xl font-light mb-6 text-gray-800 tracking-tight">
          Welcome to <span className="font-semibold text-green-600">Zero-to-Hero</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join our community in making waste management more efficient and rewarding!
        </p>
      </header>
      
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        <FeatureCard
          icon={Leaf}
          title="Eco-Friendly"
          description="Contribute to a cleaner environment by reporting and collecting waste."
        />
        <FeatureCard
          icon={Coins}
          title="Earn Rewards"
          description="Get tokens for your contributions to waste management efforts."
        />
        <FeatureCard
          icon={Users}
          title="Community-Driven"
          description="Be part of a growing community committed to sustainable practices."
        />
      </div>
      
      <div className="text-center mb-20">
        <Link href="/verify">
          <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg text-lg py-6 px-10 rounded-full font-light transition-all duration-300 ease-in-out transform hover:scale-105">
            Verify Waste
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="bg-gray-50 p-10 rounded-3xl shadow-lg">
        <h2 className="text-4xl font-light mb-12 text-center text-gray-800">Project Preview</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <h3 className="text-2xl font-light mb-6 text-gray-700">Waste Management Map</h3>
            <div className="bg-white p-8 rounded-xl shadow-md flex-grow flex flex-col justify-center items-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-green-500 mb-4 mx-auto" />
                <p className="text-xl font-semibold text-gray-700">Interactive Map Coming Soon</p>
                <p className="text-gray-500 mt-2">Stay tuned for our waste management tracking feature!</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-light mb-6 text-gray-700">Your Impact</h3>
            <div className="grid grid-cols-2 gap-6">
              <ImpactCard title="Waste Collected" value="250 kg" icon={Recycle} />
              <ImpactCard title="Reports Submitted" value="15" icon={MapPin} />
              <ImpactCard title="Tokens Earned" value="500" icon={Coins} />
              <ImpactCard title="CO2 Offset" value="100 kg" icon={Leaf} />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-light mb-6 text-gray-700">Community Leaderboard</h3>
          <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600">Rank</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">User</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Tokens</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: "EcoWarrior", tokens: 1500 },
                  { rank: 2, name: "GreenThumb", tokens: 1350 },
                  { rank: 3, name: "RecycleKing", tokens: 1200 },
                ].map((user, index) => (
                  <tr key={user.rank} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 text-gray-800">{user.rank}</td>
                    <td className="py-3 px-4 text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-gray-800">{user.tokens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) {
  return (
    <div className="p-6 rounded-xl shadow-md bg-white border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg">
      <Icon className="h-8 w-8 text-green-500 mb-4" />
      <p className="text-3xl font-bold mb-2 text-gray-800">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <Icon className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}


