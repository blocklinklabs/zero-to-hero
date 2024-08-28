'use client'
import { useState } from 'react'
import { Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Message = {
  id: number
  sender: 'user' | 'system'
  content: string
  timestamp: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'system', content: 'Welcome to EcoCollect! How can we help you today?', timestamp: '2023-05-20 10:00' },
    { id: 2, sender: 'user', content: 'Hi, I have a question about my recent collection.', timestamp: '2023-05-20 10:05' },
    { id: 3, sender: 'system', content: 'Of course! What would you like to know about your recent collection?', timestamp: '2023-05-20 10:07' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return

    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
    }

    setMessages([...messages, newMsg])
    setNewMessage('')

    // Simulate a response from the system
    setTimeout(() => {
      const systemResponse: Message = {
        id: messages.length + 2,
        sender: 'system',
        content: 'Thank you for your message. Our team will get back to you shortly.',
        timestamp: new Date().toLocaleString(),
      }
      setMessages(prev => [...prev, systemResponse])
    }, 1000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Messages</h1>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.sender === 'user' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-center mb-1">
                  {message.sender === 'system' && <User className="w-4 h-4 mr-2 text-gray-500" />}
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}