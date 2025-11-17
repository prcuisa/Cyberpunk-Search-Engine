'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Terminal, Zap, Globe, Cpu, Database, Wifi } from 'lucide-react'
import { SearchSkeleton } from '@/components/search-skeleton'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStatus, setSystemStatus] = useState('ONLINE')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setHasSearched(true)
    setSystemStatus('SCANNING')
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })
      
      const data = await response.json()
      setSearchResults(data.results || [])
      setSystemStatus('ONLINE')
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
      setSystemStatus('ERROR')
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-darker-surface opacity-50"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        {/* Status Bar */}
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="terminal-text">SYSTEM: {systemStatus}</span>
            <span className="text-neon-green">●</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-neon-cyan" />
              <span>NEURAL LINK</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-neon-green" />
              <span>CONNECTED</span>
            </div>
            <span className="terminal-text">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Terminal className="w-8 h-8 text-neon-cyan neon-glow-cyan animate-pulse" />
            <h1 className="text-6xl font-bold glitch text-neon-cyan">
              CYBER-SEARCH
            </h1>
            <Cpu className="w-8 h-8 text-neon-pink neon-glow-pink animate-pulse" />
          </div>
          
          <p className="text-xl text-muted-foreground terminal-text">
            &gt; ACCESSING GLOBAL NET...
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-neon-yellow neon-glow" />
            <span>NEURAL INTERFACE ACTIVE</span>
            <Globe className="w-4 h-4 text-neon-green neon-glow" />
          </div>
        </div>

        {/* Search Interface */}
        <Card className="w-full max-w-2xl p-8 cyber-border bg-card/50 backdrop-blur-sm scan-line">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="w-5 h-5 text-neon-cyan neon-glow-cyan" />
              </div>
              <Input
                type="text"
                placeholder="ENTER SEARCH QUERY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-4 py-4 text-lg cyber-input bg-darker-surface text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="w-full py-4 text-lg font-bold cyber-button"
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                  <span>SCANNING NET...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>EXECUTE SEARCH</span>
                </div>
              )}
            </Button>
          </div>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div className="w-full max-w-4xl space-y-4">
            {isSearching ? (
              <SearchSkeleton />
            ) : searchResults.length > 0 ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="cyber-border text-neon-cyan">
                    {searchResults.length} RESULTS FOUND
                  </Badge>
                  <Badge variant="secondary" className="text-neon-green">
                    QUERY: "{searchQuery}"
                  </Badge>
                </div>
                
                {searchResults.map((result, index) => (
                  <Card key={index} className="p-6 cyber-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:scale-[1.02]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold text-neon-cyan hover:text-neon-pink transition-colors cursor-pointer">
                          {result.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          #{result.rank}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {result.snippet}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="text-neon-green terminal-text">
                          {result.host_name}
                        </span>
                        <span>•</span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <Card className="p-8 cyber-border bg-card/30 backdrop-blur-sm text-center">
                <Terminal className="w-12 h-12 text-neon-pink neon-glow-pink mx-auto mb-4" />
                <p className="text-lg text-muted-foreground terminal-text">
                  NO RESULTS FOUND IN THE NET
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  TRY DIFFERENT KEYWORDS...
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs text-muted-foreground terminal-text">
            CYBER-SEARCH v1.0 | NEURAL LINK ESTABLISHED | SECURE CHANNEL ACTIVE
          </p>
        </div>
      </div>
    </div>
  )
}