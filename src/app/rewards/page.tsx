'use client'
import { useState } from 'react'
import { Coins, ArrowUpRight, ArrowDownRight, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Transaction = {
  id: number
  type: 'earned' | 'redeemed'
  amount: number
  description: string
  date: string
}

type Reward = {
  id: number
  name: string
  cost: number
  description: string
}

export default function RewardsPage() {
  const [balance, setBalance] = useState(500)
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'earned', amount: 50, description: 'Waste collection', date: '2023-05-15' },
    { id: 2, type: 'redeemed', amount: 100, description: 'Eco-friendly water bottle', date: '2023-05-14' },
    { id: 3, type: 'earned', amount: 30, description: 'Waste report', date: '2023-05-13' },
    { id: 4, type: 'redeemed', amount: 200, description: 'Local park donation', date: '2023-05-12' },
  ])
  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, name: 'Reusable Shopping Bag', cost: 100, description: 'Eco-friendly shopping bag made from recycled materials' },
    { id: 2, name: 'Plant a Tree', cost: 250, description: 'We\'ll plant a tree in your name in a local reforestation project' },
    { id: 3, name: 'Eco-friendly Water Bottle', cost: 150, description: 'Stainless steel water bottle with our logo' },
    { id: 4, name: 'Composting Workshop', cost: 300, description: 'Attend a workshop to learn about home composting' },
  ])

  const handleRedeemReward = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId)
    if (reward && balance >= reward.cost) {
      setBalance(balance - reward.cost)
      setTransactions([
        { id: Date.now(), type: 'redeemed', amount: reward.cost, description: reward.name, date: new Date().toISOString().split('T')[0] },
        ...transactions
      ])
      alert(`You have successfully redeemed: ${reward.name}`)
    } else {
      alert('Insufficient balance to redeem this reward')
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Rewards</h1>
      
      <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
        <div className="flex items-center">
          <Coins className="w-8 h-8 mr-2" />
          <span className="text-4xl font-bold">{balance}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center">
                  {transaction.type === 'earned' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-500 mr-3" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Rewards</h2>
          <div className="space-y-4">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{reward.name}</h3>
                  <span className="text-green-500 font-semibold">{reward.cost} points</span>
                </div>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <Button 
                  onClick={() => handleRedeemReward(reward.id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={balance < reward.cost}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Reward
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}