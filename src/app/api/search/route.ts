import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()
    
    const searchResult = await zai.functions.invoke("web_search", {
      query: query,
      num: 10
    })

    return NextResponse.json({
      success: true,
      results: searchResult || [],
      query: query
    })

  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        error: 'Search failed',
        message: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}