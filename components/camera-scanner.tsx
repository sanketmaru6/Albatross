'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Scan, CheckCircle, Star, Leaf, Clock, X, RotateCcw, Zap, Brain, Eye, MapPin, Truck, Shield, Award, TrendingUp, AlertTriangle, Info, Scale, Carrot, CookingPotIcon as Potato, HashIcon as Onion, AppleIcon } from 'lucide-react' // Import Apple icon

// Define a detailed result for a detected vegetable (e.g., Spinach)
const VEGETABLE_SCAN_RESULT = {
  item: "Fresh Organic Spinach", // Example, will be dynamic
  freshness: 92,
  quality: "Premium Grade A",
  confidence: 96.5,
  ripeness: "Optimal",
  shelfLife: "3-5 days",
  harvestDate: "1 day ago",
  nutrition: { calories: 23, protein: "2.9g", carbs: "3.6g", fiber: "2.2g", sugar: "0.4g", fat: "0.4g", vitamin_c: "47% DV", vitamin_k: "402% DV", potassium: "558mg", folate: "49% DV", iron: "15% DV" },
  analysis: { color: { primary: "Dark green", uniformity: "98%", score: "Excellent" }, texture: { firmness: "Crisp and tender", skin_quality: "No wilting or yellowing", score: "Premium" }, size: { dimensions: "15-20cm leaf length", weight: "~200g per bunch", category: "Standard" }, defects: { blemishes: "None detected", soft_spots: "None", cracks: "None", overall: "Perfect condition" } },
  safety: { pesticide_residue: "Below detection limit", organic_certified: true, food_safety_score: 97, allergens: "None" },
  sustainability: { carbon_footprint: "Low (1.8 kg CO2)", water_usage: "Efficient", packaging: "Minimal/Recyclable", local_sourcing: true },
  recipes: [
    { name: "Palak Paneer", difficulty: "Medium", time: "30 min", rating: 4.7 },
    { name: "Spinach Dal", difficulty: "Easy", time: "25 min", rating: 4.8 },
    { name: "Spinach Salad with Chickpeas", difficulty: "Easy", time: "15 min", rating: 4.6 }
  ],
  market: { average_price: "₹80/kg", price_trend: "Stable", seasonal_availability: "Peak season", demand_level: "High" },
  farmers: [
    { name: "Green Leaf Farms", distance: "5.2 km", rating: 4.9, reviews: 410, price: "₹85/kg", available: "In stock - 40 kg", delivery: "Same day (3-5 PM)", certifications: ["Organic Certified", "Local Produce"], farming_method: "Hydroponic & Organic", established: "2018", specialties: ["Spinach", "Lettuce", "Herbs"], contact: { phone: "+91 98765 11223", email: "info@greenleaffarms.in" } },
    { name: "Village Harvest Co-op", distance: "8.5 km", rating: 4.7, reviews: 320, price: "₹78/kg", available: "In stock - 60 kg", delivery: "Next day (9 AM - 1 PM)", certifications: ["Natural Farming"], farming_method: "Traditional Sustainable", established: "1995", specialties: ["Seasonal Vegetables", "Root Crops"], contact: { phone: "+91 87654 33445", email: "contact@villageharvest.in" } },
    { name: "Urban Greens Collective", distance: "3.1 km", rating: 4.8, reviews: 280, price: "₹70/kg", available: "In stock - 25 kg", delivery: "Same day (1-3 PM)", certifications: ["Pesticide-Free", "Community Supported"], farming_method: "Urban Farming", established: "2020", specialties: ["Leafy Greens", "Exotic Vegetables"], contact: { phone: "+91 76543 55667", email: "hello@urbangreens.in" } }
  ],
  comparison: [
    { name: "Carrots", icon: <Carrot className="w-6 h-6 text-orange-400" />, freshness: 88, pricePerKg: "₹60/kg", nutritionHighlights: ["Vitamin A", "Fiber"], quality: "Good Grade B" },
    { name: "Potatoes", icon: <Potato className="w-6 h-6 text-yellow-400" />, freshness: 90, pricePerKg: "₹40/kg", nutritionHighlights: ["Potassium", "Vitamin C"], quality: "Good Grade A" },
    { name: "Onions", icon: <Onion className="w-6 h-6 text-purple-400" />, freshness: 85, pricePerKg: "₹50/kg", nutritionHighlights: ["Vitamin C", "Antioxidants"], quality: "Standard Grade B" }
  ]
};

// Define a detailed result for a detected fruit (e.g., Apple)
const FRUIT_SCAN_RESULT = {
  item: "Fresh Organic Apple", // Example, will be dynamic
  freshness: 90,
  quality: "Good Grade A",
  confidence: 90.0,
  ripeness: "Optimal",
  shelfLife: "7-10 days",
  harvestDate: "2 days ago",
  nutrition: { calories: 52, protein: "0.3g", carbs: "14g", fiber: "2.4g", sugar: "10g", fat: "0.2g", vitamin_c: "14% DV", vitamin_k: "2% DV", potassium: "107mg", folate: "1% DV", iron: "1% DV" },
  analysis: { color: { primary: "Red/Green", uniformity: "95%", score: "Excellent" }, texture: { firmness: "Crisp", skin_quality: "Smooth, no bruises", score: "Premium" }, size: { dimensions: "7-8cm diameter", weight: "~180g", category: "Standard" }, defects: { blemishes: "None detected", soft_spots: "None", cracks: "None", overall: "Perfect condition" } },
  safety: { pesticide_residue: "Below detection limit", organic_certified: true, food_safety_score: 95, allergens: "None" },
  sustainability: { carbon_footprint: "Low (0.5 kg CO2)", water_usage: "Efficient", packaging: "Minimal", local_sourcing: true },
  recipes: [
    { name: "Apple Pie", difficulty: "Medium", time: "60 min", rating: 4.5 },
    { name: "Apple Salad", difficulty: "Easy", time: "15 min", rating: 4.2 }
  ],
  market: { average_price: "₹120/kg", price_trend: "Stable", seasonal_availability: "Year-round", demand_level: "High" },
  farmers: [
    { name: "Orchard Fresh Farms", distance: "15 km", rating: 4.8, reviews: 250, price: "₹130/kg", available: "In stock - 100 kg", delivery: "Next day", certifications: ["Organic Certified"], farming_method: "Traditional Orchard", established: "2005", specialties: ["Apples", "Pears"], contact: { phone: "+91 98765 99887", email: "info@orchardfresh.in" } }
  ],
  comparison: [
    { name: "Bananas", icon: <Leaf className="w-6 h-6 text-yellow-400" />, freshness: 80, pricePerKg: "₹50/kg", nutritionHighlights: ["Potassium", "Vitamin B6"], quality: "Good Grade B" },
    { name: "Oranges", icon: <Leaf className="w-6 h-6 text-orange-400" />, freshness: 85, pricePerKg: "₹80/kg", nutritionHighlights: ["Vitamin C", "Fiber"], quality: "Good Grade A" }
  ]
};


export function CameraScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [detectionError, setDetectionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setDetectionError(null);
    console.log('Attempting to start camera...');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera not supported in this browser. Please use a modern browser.');
      return;
    }

    let mediaStream: MediaStream | null = null;
    const commonConstraints = {
      width: { min: 640, ideal: 1280 },
      height: { min: 480, ideal: 720 }
    };

    const tryGetStream = async (constraints: MediaStreamConstraints) => {
      try {
        return await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        console.warn('Failed with constraints:', constraints, error);
        return null;
      }
    };

    // Attempt 1: Back camera with ideal resolution
    mediaStream = await tryGetStream({ video: { facingMode: 'environment', ...commonConstraints } });

    // Attempt 2: Front camera with ideal resolution if back fails
    if (!mediaStream) {
      mediaStream = await tryGetStream({ video: { facingMode: 'user', ...commonConstraints } });
    }

    // Attempt 3: Any camera with ideal resolution if both specific facing modes fail
    if (!mediaStream) {
      mediaStream = await tryGetStream({ video: commonConstraints });
    }

    // Attempt 4: Any camera with minimal constraints if all above fail
    if (!mediaStream) {
      mediaStream = await tryGetStream({ video: true });
    }

    if (mediaStream) {
      console.log('Camera stream obtained:', mediaStream);
      setStream(mediaStream);
      setIsCameraOpen(true);
    } else {
      let errorMessage = 'Could not access camera. ';
      errorMessage += 'No camera device found or access was denied. Please ensure a camera is connected and permissions are granted.';
      setCameraError(errorMessage);
      console.error('All camera access attempts failed.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    console.log('Stopping camera...');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
    setCameraError(null);
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0)
    
    // Get the captured image as data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8)
    setCapturedImage(imageDataUrl)

    // Start scanning animation with progress
    setIsScanning(true)
    setScanProgress(0)
    stopCamera()

    // Simulate AI analysis with progress updates
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // --- Simulated Object Detection Logic ---
    // Updated to include 'fruit' category and specific items
    const possibleDetections = [
      { item: "Spinach", category: "vegetable" },
      { item: "Carrot", category: "vegetable" },
      { item: "Potato", category: "vegetable" },
      { item: "Apple", category: "fruit" }, // Now categorized as fruit
      { item: "Banana", category: "fruit" }, // New fruit example
      { item: "Person", category: "non-food" }, // Changed category for clarity
      { item: "Chair", category: "non-food" }, // Changed category for clarity
      { item: "Book", category: "non-food" }, // New non-food example
    ];
    const simulatedDetectedItem = possibleDetections[Math.floor(Math.random() * possibleDetections.length)];

    setTimeout(() => {
      clearInterval(progressInterval)
      setScanProgress(100)
      setIsScanning(false)
      
      if (simulatedDetectedItem.category === "vegetable") {
        setDetectionError(null);
        // Dynamically set item name for vegetable result
        setScanResult({ ...VEGETABLE_SCAN_RESULT, item: `Fresh Organic ${simulatedDetectedItem.item}` });
      } else if (simulatedDetectedItem.category === "fruit") {
        setDetectionError(null);
        // Dynamically set item name for fruit result
        setScanResult({ ...FRUIT_SCAN_RESULT, item: `Fresh Organic ${simulatedDetectedItem.item}` });
      } else {
        setScanResult(null); // Clear any previous successful scan results
        setDetectionError(`'${simulatedDetectedItem.item}' is not a vegetable or fruit. Please scan a valid food item.`);
      }
    }, 4000)
  }, [stopCamera])

  const resetScanner = () => {
    setScanResult(null)
    setIsScanning(false)
    setIsCameraOpen(false)
    setScanProgress(0)
    setCapturedImage(null)
    setCameraError(null)
    setDetectionError(null);
  }

  // Effect to manage video stream lifecycle
  useEffect(() => {
    const videoElement = videoRef.current;
    if (isCameraOpen && videoElement && stream) {
      console.log('Attempting to play video stream in useEffect...');
      videoElement.srcObject = stream;
      videoElement.play().then(() => {
        console.log('Video stream playing successfully.');
      }).catch(e => {
        console.error("Error playing video stream in useEffect:", e);
        setCameraError("Problem playing video stream after camera access.");
      });
    } else if (videoElement) {
      console.log('Stopping video stream in useEffect cleanup or state change.');
      // Stop and clear stream if camera is closed or stream is null
      if (videoElement.srcObject) {
        (videoElement.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      videoElement.srcObject = null;
    }
    // Cleanup function: stop tracks when component unmounts or dependencies change
    return () => {
      console.log('useEffect cleanup: stopping video tracks.');
      if (videoElement && videoElement.srcObject) {
        (videoElement.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    };
  }, [isCameraOpen, stream]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">AI Food Scanner</CardTitle>
          <CardDescription className="text-white/60">
            Advanced computer vision for comprehensive produce analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {detectionError ? (
            // Detection Error state
            <div className="space-y-6">
              <div className="relative aspect-video bg-gradient-to-br from-red-900 to-black rounded-2xl overflow-hidden border border-red-400/30 shadow-2xl flex items-center justify-center">
                <div className="text-center p-6">
                  <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                  <p className="text-red-300 font-semibold text-lg mb-2">Detection Error</p>
                  <p className="text-white/70 text-sm mb-4">{detectionError}</p>
                  <Button 
                    onClick={resetScanner}
                    variant="outline"
                    className="border-red-400/50 text-red-300 hover:bg-red-400/10"
                  >
                    Try Scanning Again
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={resetScanner}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-4 text-lg shadow-lg shadow-green-500/25 border-0 group"
                >
                  <RotateCcw className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  Reset Scanner
                </Button>
              </div>
            </div>
          ) : !scanResult ? (
            <div className="space-y-6">
              {/* Camera/Image Display Box */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {cameraError ? (
                  // Camera Error state
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      <p className="text-red-300 font-semibold text-lg mb-2">Camera Error</p>
                      <p className="text-white/70 text-sm mb-4">{cameraError}</p>
                      <Button 
                        onClick={startCamera}
                        variant="outline"
                        className="border-red-400/50 text-red-300 hover:bg-red-400/10"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : !isCameraOpen && !isScanning && !capturedImage ? (
                  // Initial state - Camera Ready
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-green-500/30">
                        <Camera className="h-12 w-12 text-green-400" />
                      </div>
                      <p className="text-white/90 font-semibold text-lg mb-2">Camera Ready</p>
                      <p className="text-white/60">Click below to access your camera and start scanning</p>
                    </div>
                  </div>
                ) : isScanning && capturedImage ? (
                  // Scanning state - Show captured image with analysis overlay
                  <div className="relative w-full h-full">
                    <img 
                      src={capturedImage || "/placeholder.svg"} 
                      alt="Captured produce" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-blue-900/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center max-w-md">
                        <div className="relative mb-6">
                          <div className="w-24 h-24 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-300 mb-2">AI Analyzing...</h3>
                        <p className="text-white/80 mb-4">Processing with advanced neural networks</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-6">
                          <Progress value={scanProgress} className="h-2 bg-white/20" />
                          <p className="text-sm text-white/60 mt-2">{Math.round(scanProgress)}% Complete</p>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-center text-white/70">
                            <Eye className="w-4 h-4 mr-2 text-green-400" />
                            <span>Analyzing visual characteristics...</span>
                          </div>
                          <div className="flex items-center justify-center text-white/70">
                            <Zap className="w-4 h-4 mr-2 text-blue-400" />
                            <span>Processing nutritional content...</span>
                          </div>
                          <div className="flex items-center justify-center text-white/70">
                            <Brain className="w-4 h-4 mr-2 text-purple-400" />
                            <span>Matching with local farmers...</span>
                          </div>
                          <div className="flex items-center justify-center text-white/70">
                            <TrendingUp className="w-4 h-4 mr-2 text-orange-400" />
                            <span>Calculating market insights...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isCameraOpen ? (
                  // Camera active state - Show live video feed
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                      autoPlay
                      style={{ 
                        transform: stream?.getVideoTracks()[0]?.getSettings().facingMode === 'user' ? 'scaleX(-1)' : 'none',
                        WebkitTransform: stream?.getVideoTracks()[0]?.getSettings().facingMode === 'user' ? 'scaleX(-1)' : 'none'
                      }}
                    />
                    {/* Scanning overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-4 border-2 border-dashed border-green-400/60 rounded-xl animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-green-400 rounded-lg"></div>
                      
                      {/* Corner guides */}
                      <div className="absolute top-8 left-8 w-6 h-6 border-l-4 border-t-4 border-green-400"></div>
                      <div className="absolute top-8 right-8 w-6 h-6 border-r-4 border-t-4 border-green-400"></div>
                      <div className="absolute bottom-8 left-8 w-6 h-6 border-l-4 border-b-4 border-green-400"></div>
                      <div className="absolute bottom-8 right-8 w-6 h-6 border-r-4 border-b-4 border-green-400"></div>
                    </div>
                    
                    {/* Camera controls */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={stopCamera}
                        className="bg-black/70 border-white/30 text-white hover:bg-black/90 backdrop-blur-sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <p className="text-white text-sm font-medium">
                          Position produce in the center frame
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isCameraOpen && !isScanning ? (
                  <Button 
                    onClick={startCamera}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-4 text-lg shadow-lg shadow-green-500/25 border-0 group"
                  >
                    <Camera className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    Access Camera & Start Scanning
                    <Zap className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
                  </Button>
                ) : isCameraOpen && !isScanning ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={capturePhoto}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-3 text-lg shadow-lg border-0 group"
                    >
                      <Scan className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Capture & Analyze
                    </Button>
                    <Button 
                      onClick={stopCamera}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 py-3 text-lg backdrop-blur-sm"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Show captured image in results */}
              {capturedImage && (
                <div className="text-center">
                  <div className="relative inline-block">
                    <img 
                      src={capturedImage || "/placeholder.svg"} 
                      alt="Analyzed produce" 
                      className="w-48 h-48 object-cover rounded-2xl border-2 border-green-400/30 shadow-lg"
                    />
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Analyzed
                    </Badge>
                  </div>
                </div>
              )}

              {/* Scan Results Header */}
              <div className="text-center">
                <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border border-green-500/30 px-6 py-2 text-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Analysis Complete
                </Badge>
                <h3 className="text-3xl font-bold text-white mb-2">{scanResult.item}</h3>
                <div className="flex items-center justify-center space-x-4 text-white/70">
                  <span>Confidence: {scanResult.confidence}%</span>
                  <span>•</span>
                  <span>Ripeness: {scanResult.ripeness}</span>
                  <span>•</span>
                  <span>Shelf Life: {scanResult.shelfLife}</span>
                </div>
              </div>

              {/* Main Analysis Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Freshness & Quality */}
                <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-white flex items-center">
                      <Award className="w-6 h-6 mr-2 text-green-400" />
                      Quality Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-200 mb-1">Freshness Score</p>
                          <p className="text-4xl font-bold text-green-400">{scanResult.freshness}%</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-500 text-white mb-2 text-lg px-3 py-1">{scanResult.quality}</Badge>
                          <p className="text-sm text-green-200">Grade Rating</p>
                        </div>
                      </div>
                      <div className="bg-green-900/30 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${scanResult.freshness}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-200">Harvest Date</p>
                          <p className="text-white font-semibold">{scanResult.harvestDate}</p>
                        </div>
                        <div>
                          <p className="text-green-200">Expected Shelf Life</p>
                          <p className="text-white font-semibold">{scanResult.shelfLife}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Safety & Sustainability */}
                <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-white flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-blue-400" />
                      Safety & Sustainability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-200 mb-1">Food Safety Score</p>
                          <p className="text-4xl font-bold text-blue-400">{scanResult.safety.food_safety_score}%</p>
                        </div>
                        <div className="text-right">
                          {scanResult.safety.organic_certified && (
                            <Badge className="bg-green-500 text-white mb-2">Organic Certified</Badge>
                          )}
                          <p className="text-sm text-blue-200">USDA Verified</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-200">Pesticide Residue:</span>
                          <span className="text-green-400 font-semibold">{scanResult.safety.pesticide_residue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Carbon Footprint:</span>
                          <span className="text-white">{scanResult.sustainability.carbon_footprint}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Local Sourcing:</span>
                          <span className="text-green-400 font-semibold">
                            {scanResult.sustainability.local_sourcing ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analysis */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Nutrition */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-white">
                      <Leaf className="w-5 h-5 mr-2 text-purple-400" />
                      Nutrition (per 100g)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <p className="text-2xl font-bold text-purple-400">{scanResult.nutrition.calories}</p>
                        <p className="text-xs text-white/60">Calories</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-400">{scanResult.nutrition.protein}</p>
                        <p className="text-xs text-white/60">Protein</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-400">{scanResult.nutrition.vitamin_c}</p>
                        <p className="text-xs text-white/60">Vitamin C</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-400">{scanResult.nutrition.iron}</p>
                        <p className="text-xs text-white/60">Iron</p>
                      </div>
                    </div>
                    <div className="text-xs space-y-1 text-white/70">
                      <div className="flex justify-between">
                        <span>Fiber:</span>
                        <span>{scanResult.nutrition.fiber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Potassium:</span>
                        <span>{scanResult.nutrition.potassium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Folate:</span>
                        <span>{scanResult.nutrition.folate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Visual Analysis */}
                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-white">
                      <Eye className="w-5 h-5 mr-2 text-orange-400" />
                      Visual Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-orange-200 font-medium">Color:</span>
                        <p className="text-white">{scanResult.analysis.color.primary}</p>
                        <p className="text-xs text-white/60">Uniformity: {scanResult.analysis.color.uniformity}</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Texture:</span>
                        <p className="text-white">{scanResult.analysis.texture.firmness}</p>
                        <p className="text-xs text-white/60">{scanResult.analysis.texture.skin_quality}</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Size:</span>
                        <p className="text-white">{scanResult.analysis.size.dimensions}</p>
                        <p className="text-xs text-white/60">Weight: {scanResult.analysis.size.weight}</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Condition:</span>
                        <p className="text-green-400 font-semibold">{scanResult.analysis.defects.overall}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Info */}
                <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-white">
                      <TrendingUp className="w-5 h-5 mr-2 text-pink-400" />
                      Market Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-pink-400">{scanResult.market.average_price}</p>
                      <p className="text-xs text-white/60">Average Market Price</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-pink-200">Price Trend:</span>
                        <span className="text-green-400">{scanResult.market.price_trend}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pink-200">Season:</span>
                        <span className="text-white">{scanResult.market.seasonal_availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pink-200">Demand:</span>
                        <span className="text-orange-400">{scanResult.market.demand_level}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recipe Suggestions */}
              <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Leaf className="w-6 h-6 mr-2 text-indigo-400" />
                    Recommended Recipes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {scanResult.recipes.map((recipe: any, index: number) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-white mb-2">{recipe.name}</h4>
                        <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                          <span>{recipe.difficulty}</span>
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-white/80">{recipe.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Local Farmers */}
              <div>
                <h4 className="font-semibold mb-6 flex items-center text-white text-xl">
                  <MapPin className="w-6 h-6 mr-2 text-green-400" />
                  Available from Local Farmers
                </h4>
                <div className="space-y-4">
                  {scanResult.farmers.map((farmer: any, index: number) => (
                    <Card key={index} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-green-400/30 transition-all duration-300 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h5 className="font-bold text-white text-lg mb-1">{farmer.name}</h5>
                                <div className="flex items-center text-sm text-white/60 mb-2">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  <span className="mr-4">{farmer.distance} away</span>
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                    <span>{farmer.rating} ({farmer.reviews} reviews)</span>
                                  </div>
                                </div>
                                <p className="text-white/70 text-sm mb-3">{farmer.farming_method} • Est. {farmer.established}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-400 text-2xl mb-1">{farmer.price}</p>
                                <p className="text-white/60 text-sm">{farmer.available}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-white/60 mb-1">Delivery:</p>
                                <p className="text-white flex items-center">
                                  <Truck className="w-4 h-4 mr-1 text-blue-400" />
                                  {farmer.delivery}
                                </p>
                              </div>
                              <div>
                                <p className="text-white/60 mb-1">Specialties:</p>
                                <p className="text-white">{farmer.specialties.join(', ')}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {farmer.certifications.map((cert: string, certIndex: number) => (
                                <Badge key={certIndex} className="bg-green-500/20 text-green-300 border border-green-500/30">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between">
                            <div className="space-y-2 text-sm text-white/70 mb-4">
                              <p>📞 {farmer.contact.phone}</p>
                              <p>✉️ {farmer.contact.email}</p>
                            </div>
                            <div className="space-y-2">
                              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 border-0 shadow-lg">
                                Order Now
                              </Button>
                              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                                Contact Farmer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Vegetable Comparison Section */}
              {scanResult.comparison && scanResult.comparison.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-6 flex items-center text-white text-xl">
                    <Scale className="w-6 h-6 mr-2 text-yellow-400" />
                    Vegetable Comparison
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {scanResult.comparison.map((veg: any, index: number) => (
                      <Card key={index} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            {veg.icon}
                            <h5 className="font-bold text-white text-lg">{veg.name}</h5>
                          </div>
                          <div className="space-y-2 text-sm text-white/70">
                            <div className="flex justify-between">
                              <span>Freshness:</span>
                              <span className="text-green-400 font-semibold">{veg.freshness}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Price:</span>
                              <span className="text-white font-semibold">{veg.pricePerKg}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quality:</span>
                              <span className="text-white">{veg.quality}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Highlights:</span>
                              <span className="text-white">{veg.nutritionHighlights.join(', ')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={resetScanner} 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 border-0 py-3 text-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Scan Another Item
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 py-3 text-lg backdrop-blur-sm"
                >
                  <Info className="w-5 h-5 mr-2" />
                  Save Analysis
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
