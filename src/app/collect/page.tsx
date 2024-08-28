'use client'
import { useState, useEffect } from 'react'
import { Trash2, MapPin, CheckCircle, Clock, ArrowRight, Camera, Upload, Loader, Calendar, Weight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

type CollectionTask = {
  id: number
  location: string
  wasteType: string
  amount: string
  status: 'pending' | 'in_progress' | 'completed' | 'verified'
  date: string
}

export default function CollectPage() {
  const [tasks, setTasks] = useState<CollectionTask[]>([
    { id: 1, location: '123 Green St', wasteType: 'Plastic', amount: '5kg', status: 'pending', date: '2023-05-10' },
    { id: 2, location: '456 Eco Ave', wasteType: 'Paper', amount: '3kg', status: 'in_progress', date: '2023-05-11' },
    { id: 3, location: '789 Recycle Rd', wasteType: 'Glass', amount: '2kg', status: 'completed', date: '2023-05-12' },
    { id: 4, location: '321 Nature Ln', wasteType: 'Metal', amount: '4kg', status: 'verified', date: '2023-05-13' },
  ])

  const [selectedTask, setSelectedTask] = useState<CollectionTask | null>(null)
  const [verificationImage, setVerificationImage] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failure'>('idle')
  const [reward, setReward] = useState<number | null>(null)

  const handleStatusChange = (taskId: number, newStatus: CollectionTask['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVerificationImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVerify = async () => {
    if (!selectedTask || !verificationImage) return

    setVerificationStatus('verifying')
    
    // Simulating AI verification process
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% success rate for demo purposes
      if (success) {
        const earnedReward = Math.floor(Math.random() * 50) + 10 // Random reward between 10 and 59
        handleStatusChange(selectedTask.id, 'verified')
        setVerificationStatus('success')
        setReward(earnedReward)
        setSelectedTask(null)
        toast.success(`Verification successful! You earned ${earnedReward} tokens!`, {
          duration: 5000,
          position: 'top-center',
        })
      } else {
        setVerificationStatus('failure')
      }
    }, 3000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Waste Collection Tasks</h1>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                {task.location}
              </h2>
              <StatusBadge status={task.status} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Trash2 className="w-4 h-4 mr-2 text-gray-500" />
                {task.wasteType}
              </div>
              <div className="flex items-center">
                <Weight className="w-4 h-4 mr-2 text-gray-500" />
                {task.amount}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {task.date}
              </div>
            </div>
            <div className="flex justify-end">
              {task.status === 'pending' && (
                <Button onClick={() => handleStatusChange(task.id, 'in_progress')} variant="outline" size="sm">
                  Start Collection
                </Button>
              )}
              {task.status === 'in_progress' && (
                <Button onClick={() => setSelectedTask(task)} variant="outline" size="sm">
                  Complete & Verify
                </Button>
              )}
              {task.status === 'verified' && (
                <span className="text-green-600 text-sm font-medium">Reward Earned</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Verify Collection</h3>
            <p className="mb-4 text-sm text-gray-600">Upload a photo of the collected waste to verify and earn your reward.</p>
            <div className="mb-4">
              <label htmlFor="verification-image" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="verification-image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="verification-image" name="verification-image" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            {verificationImage && (
              <img src={verificationImage} alt="Verification" className="mb-4 rounded-md w-full" />
            )}
            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={!verificationImage || verificationStatus === 'verifying'}
            >
              {verificationStatus === 'verifying' ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Verifying...
                </>
              ) : 'Verify Collection'}
            </Button>
            {verificationStatus === 'success' && (
              <p className="mt-2 text-green-600 text-center text-sm">Verification successful! Reward earned.</p>
            )}
            {verificationStatus === 'failure' && (
              <p className="mt-2 text-red-600 text-center text-sm">Verification failed. Please try again.</p>
            )}
            <Button onClick={() => setSelectedTask(null)} variant="outline" className="w-full mt-2">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: CollectionTask['status'] }) {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    in_progress: { color: 'bg-blue-100 text-blue-800', icon: Trash2 },
    completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    verified: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
  }

  const { color, icon: Icon } = statusConfig[status]

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} flex items-center`}>
      <Icon className="mr-1 h-3 w-3" />
      {status.replace('_', ' ')}
    </span>
  )
}