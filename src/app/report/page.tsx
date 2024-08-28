'use client'
import { useState } from 'react'
import { Trash2, MapPin, Upload, CheckCircle, XCircle, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ReportPage() {
  const [reports, setReports] = useState([
    { id: 1, location: '123 Green St', type: 'Plastic', amount: '5kg', date: '2023-05-01' },
    { id: 2, location: '456 Eco Ave', type: 'Paper', amount: '3kg', date: '2023-05-02' },
    { id: 3, location: '789 Recycle Rd', type: 'Glass', amount: '2kg', date: '2023-05-03' },
  ])

  const [newReport, setNewReport] = useState({
    location: '',
    type: '',
    amount: '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failure'>('idle')
  const [verificationResult, setVerificationResult] = useState<{
    wasteType: string;
    quantity: string;
    confidence: number;
  } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewReport({ ...newReport, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleVerify = async () => {
    if (!file) return

    setVerificationStatus('verifying')
    
    // Simulating AI verification process
    setTimeout(() => {
      // This is where you would integrate with Galadriel or your AI service
      const mockResult = {
        wasteType: 'Plastic',
        quantity: '2.5 kg',
        confidence: 0.92
      }
      setVerificationResult(mockResult)
      setVerificationStatus('success')
      // Populate the form with the verification result
      setNewReport({
        ...newReport,
        type: mockResult.wasteType,
        amount: mockResult.quantity
      })
    }, 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (verificationStatus !== 'success') {
      alert('Please verify the waste before submitting.')
      return
    }
    const report = {
      id: reports.length + 1,
      ...newReport,
      date: new Date().toISOString().split('T')[0],
    }
    setReports([report, ...reports])
    setNewReport({ location: '', type: '', amount: '' })
    setFile(null)
    setPreview(null)
    setVerificationStatus('idle')
    setVerificationResult(null)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Report Waste</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-12">
        <div className="mb-8">
          <label htmlFor="waste-image" className="block text-lg font-medium text-gray-700 mb-2">
            Upload Waste Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-500 transition-colors duration-300">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="waste-image"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload a file</span>
                  <input id="waste-image" name="waste-image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        
        {preview && (
          <div className="mt-4 mb-8">
            <img src={preview} alt="Waste preview" className="max-w-full h-auto rounded-xl shadow-md" />
          </div>
        )}
        
        <Button 
          type="button" 
          onClick={handleVerify} 
          className="w-full mb-8 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-xl transition-colors duration-300" 
          disabled={!file || verificationStatus === 'verifying'}
        >
          {verificationStatus === 'verifying' ? (
            <>
              <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Verifying...
            </>
          ) : 'Verify Waste'}
        </Button>

        {verificationStatus === 'success' && verificationResult && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8 rounded-r-xl">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800">Verification Successful</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Waste Type: {verificationResult.wasteType}</p>
                  <p>Quantity: {verificationResult.quantity}</p>
                  <p>Confidence: {(verificationResult.confidence * 100).toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newReport.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Enter waste location"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newReport.type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-gray-100"
              placeholder="Verified waste type"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Estimated Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={newReport.amount}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-gray-100"
              placeholder="Verified amount"
              readOnly
            />
          </div>
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl transition-colors duration-300">
          Submit Report
        </Button>
      </form>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Recent Reports</h2>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <MapPin className="inline-block w-4 h-4 mr-2 text-green-500" />
                  {report.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}