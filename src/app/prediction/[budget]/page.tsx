'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function PredictionResultPage() {
  const params = useParams()
  const budget = params.budget as string

  const [prediction, setPrediction] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Replace with your Flask API base URL
  const API_BASE_URL = 'http://localhost:5000'

  useEffect(() => {
    if (budget) {
      getPrediction()
    }
  }, [budget])

  const getPrediction = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/prediction/${budget}`)
      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }
      const predictionResult = await response.text()
      setPrediction(predictionResult)
    } catch (err) {
      setError('Error getting prediction: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Predicted Budget Result
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Display Budget */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800">
              <span className="font-medium">Marketing Budget:</span> ${budget}k
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Getting prediction...</p>
            </div>
          )}

          {/* Display Prediction */}
          {prediction && !loading && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h2 className="text-lg font-medium text-green-800 mb-2">
                Prediction Result
              </h2>
              <p className="text-green-800">
                <span className="font-medium">Predicted Sales:</span> ${prediction}k
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h2 className="text-lg font-medium text-red-800 mb-2">
                Error
              </h2>
              <p className="text-red-700">{error}</p>
              <button
                onClick={getPrediction}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-rose-100 to-teal-100"
              style={{ color: "black" }}
            >
              Back to Budget Input
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}