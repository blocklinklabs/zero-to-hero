import { ArrowRight, Leaf, Recycle, Users, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-6 text-gray-800 text-center">Welcome to Zero-to-Hero</h1>
      <p className="text-xl mb-12 text-gray-600 text-center max-w-2xl mx-auto">
        Join our community in making waste management more efficient and rewarding!
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
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
      
      <div className="text-center">
        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md text-lg py-6 px-8 rounded-full">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <Icon className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
