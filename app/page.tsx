import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CameraScanner } from "@/components/camera-scanner"
import { Camera, Scan, Bot, Sparkles, Leaf, ShoppingCart, Zap, Star, ArrowRight, CheckCircle, Brain, Eye, Smartphone, Play, Users, TrendingUp } from 'lucide-react'
import { MarketPredictor } from "@/components/market-predictor"

export default function HomePage() {
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    {/* Animated Background */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    {/* Header */}
    <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
            <Leaf className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            FarmFresh AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            Sign In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg shadow-green-500/25 border-0">
            Get Started
          </Button>
        </div>
      </div>
    </header>

    {/* Hero Section */}
    <section className="relative py-24 px-6">
      <div className="container mx-auto text-center">
        <Badge className="mb-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border border-green-500/30 px-6 py-2 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Fresh Produce Platform
        </Badge>
        
        <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
            Scan. Analyze.
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Fresh Food.
          </span>
        </h1>
        
        <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
          Revolutionary AI technology that scans any produce with your camera, 
          analyzes freshness in real-time, and connects you with local farmers instantly.
        </p>

        {/* Camera Scanner Component */}
        <div className="max-w-lg mx-auto mb-12">
          <CameraScanner />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-10 py-4 shadow-2xl shadow-green-500/25 border-0 group">
            <Camera className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            Start Scanning Now
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-10 py-4 border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>

    {/* AI Features */}
    <section className="relative py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
            <Brain className="w-4 h-4 mr-2" />
            Advanced AI Technology
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-white">
            Smart Features That <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Change Everything</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Experience the future of fresh food with cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* AI Food Scanner */}
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-500 group hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-500">
                <Eye className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">AI Food Scanner</CardTitle>
              <CardDescription className="text-green-200">Real-time freshness analysis with your camera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                  <span>Instant freshness detection</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                  <span>Nutritional analysis</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                  <span>Quality scoring system</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                  <span>Recipe recommendations</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 shadow-lg">
                Try Scanner
              </Button>
            </CardContent>
          </Card>

          {/* Smart Recommendations */}
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 group hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500">
                <Sparkles className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">Smart Recommendations</CardTitle>
              <CardDescription className="text-blue-200">Personalized produce suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                  <span>Dietary preference matching</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                  <span>Seasonal optimization</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                  <span>Price comparison</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                  <span>Local farmer matching</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg">
                Get Recommendations
              </Button>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500">
                <Bot className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">AI Assistant</CardTitle>
              <CardDescription className="text-purple-200">24/7 intelligent support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                  <span>Crop planning advice</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                  <span>Market trend analysis</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                  <span>Instant customer support</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                  <span>Order management</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 shadow-lg">
                Chat with AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="relative py-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <p className="text-white/60">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <p className="text-white/60">Local Farmers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              1M+
            </div>
            <p className="text-white/60">Scans Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <p className="text-white/60">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="relative py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Simple. Smart. <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Revolutionary.</span>
          </h2>
          <p className="text-xl text-white/60">Transform your fresh food experience in 3 easy steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-500 group-hover:scale-110">
              <Smartphone className="h-12 w-12 text-white" />
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-white">1. Scan with Camera</h3>
              <p className="text-white/70">Point your phone at any produce to get instant AI analysis and freshness scoring</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
              <Bot className="h-12 w-12 text-white" />
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-white">2. Get AI Insights</h3>
              <p className="text-white/70">Our AI analyzes freshness, nutrition, and finds the best local farmers for you</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
              <ShoppingCart className="h-12 w-12 text-white" />
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-white">3. Order & Enjoy</h3>
              <p className="text-white/70">Get the freshest produce delivered directly from local farms to your door</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Market Predictor Section */}
    <section className="relative py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <MarketPredictor />
      </div>
    </section>

    {/* CTA Section */}
    <section className="relative py-24 px-6">
      <div className="container mx-auto text-center">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join thousands of users already using AI to discover the freshest produce from local farmers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-12 py-4 shadow-2xl shadow-green-500/25 border-0 group">
              <Camera className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Start Scanning Now
              <Sparkles className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-12 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="relative border-t border-white/10 bg-white/5 backdrop-blur-xl py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FarmFresh AI</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Revolutionary AI platform connecting farmers with fresh food lovers through intelligent scanning and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">AI Features</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">Food Scanner</li>
              <li className="hover:text-white transition-colors cursor-pointer">Smart Recommendations</li>
              <li className="hover:text-white transition-colors cursor-pointer">Freshness Analysis</li>
              <li className="hover:text-white transition-colors cursor-pointer">Local Farmer Network</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">Get Started</h4>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 border-0 shadow-lg">
                <Camera className="w-4 h-4 mr-2" />
                Try AI Scanner
              </Button>
              <p className="text-xs text-white/40">Available on web, iOS and Android</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
          <p>&copy; 2024 FarmFresh AI. All rights reserved. Built with ❤️ for the future of fresh food.</p>
        </div>
      </div>
    </footer>
  </div>
)
}
