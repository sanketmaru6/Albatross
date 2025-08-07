'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, TrendingUp, DollarSign, Info, AlertCircle } from 'lucide-react'

export function MarketPredictor() {
  const [commodity, setCommodity] = useState('')
  const [state, setState] = useState('')
  const [quantity, setQuantity] = useState<number | ''>(1)
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [commoditiesList, setCommoditiesList] = useState<string[]>([])
  const [statesList, setStatesList] = useState<string[]>([])

  // IMPORTANT: Ensure your Flask backend is running at this URL.
  // If deployed, replace 'http://localhost:5000' with your deployed backend URL.
  const BACKEND_URL = 'http://localhost:5000'; 

  useEffect(() => {
    const fetchCommoditiesAndStates = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/commodities`);
        if (!response.ok) {
          // If response is not OK, it means server responded with an error status (e.g., 404, 500)
          const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
          throw new Error(`Server responded with status ${response.status}: ${errorData.error || errorData.message}`);
        }
        const data = await response.json();
        if (data.success) {
          setCommoditiesList(data.commodities);
          setStatesList(data.states);
        } else {
          setError(data.error || 'Failed to fetch commodities and states.');
        }
      } catch (err: any) {
        // This catch block handles network errors (like 'Failed to fetch' if backend is down)
        // or errors thrown from the 'if (!response.ok)' block.
        if (err.message.includes('Failed to fetch')) {
          setError(`Could not connect to the backend server at ${BACKEND_URL}. Please ensure your Flask backend is running.`);
        } else {
          setError(`Error fetching commodities and states: ${err.message}`);
        }
        console.error('Error fetching commodities/states:', err);
      }
    };

    fetchCommoditiesAndStates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    if (!commodity || !state || quantity === '') {
      setError('Please select a commodity, state, and enter a quantity.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commodity,
          state,
          quantity: Number(quantity),
          // month and year can be added here if needed, or let backend default
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
        throw new Error(`Server responded with status ${response.status}: ${errorData.error || errorData.message}`);
      }

      const data = await response.json();
      if (data.success) {
        setPrediction(data.predictions);
      } else {
        setError(data.error || 'Prediction failed.');
      }
    } catch (err: any) {
      if (err.message.includes('Failed to fetch')) {
        setError(`Could not connect to the backend server at ${BACKEND_URL}. Please ensure your Flask backend is running.`);
      } else {
        setError(`Error making prediction: ${err.message}.`);
      }
      console.error('Error during prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Market Price & Demand Predictor</CardTitle>
        <CardDescription className="text-white/60">
          Get AI-powered insights on commodity prices and demand velocity.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="commodity" className="text-white/80 mb-2 block">Commodity</Label>
              <Select value={commodity} onValueChange={setCommodity}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a commodity" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {commoditiesList.length > 0 ? (
                    commoditiesList.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>Loading commodities...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="state" className="text-white/80 mb-2 block">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  {statesList.length > 0 ? (
                    statesList.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>Loading states...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="quantity" className="text-white/80 mb-2 block">Quantity (in units)</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              className="bg-white/10 border-white/20 text-white"
              min="1"
            />
          </div>
          
          {error && (
            <div className="flex items-center p-3 rounded-md bg-red-900/30 text-red-300 border border-red-400/50 text-sm">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 text-lg shadow-lg shadow-purple-500/25 border-0 group"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <TrendingUp className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Get Market Prediction
              </>
            )}
          </Button>
        </form>

        {prediction && (
          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-bold text-white text-center mb-4">Prediction Results</h4>
            <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/10 border border-green-500/30 backdrop-blur-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-200 mb-1">Predicted Price Per Unit</p>
                  <p className="text-4xl font-bold text-green-400 flex items-center">
                    <DollarSign className="w-8 h-8 mr-2" />
                    {typeof prediction.price_per_unit === 'number' ? `₹${prediction.price_per_unit}` : prediction.price_per_unit}
                  </p>
                </div>
                <Info className="w-8 h-8 text-green-400" />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200 mb-1">Predicted Demand Velocity</p>
                  <p className="text-4xl font-bold text-blue-400 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-2" />
                    {typeof prediction.demand_velocity === 'number' ? prediction.demand_velocity.toFixed(4) : prediction.demand_velocity}
                  </p>
                </div>
                <Info className="w-8 h-8 text-blue-400" />
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
