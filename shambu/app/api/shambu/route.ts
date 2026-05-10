
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const query = body.query

  const tavilyRes = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: 'advanced',
      include_answer: true,
      max_results: 5
    })
  })

  const tavilyData = await tavilyRes.json()

  const webContext = tavilyData.answer || ''

  const openRouterRes = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content:
              'You are SHAMBU, a futuristic bilingual AI assistant. Reply naturally in Urdu or English based on user language.'
          },
          {
            role: 'user',
            content: `User Query: ${query}\n\nLive Web Data: ${webContext}`
          }
        ]
      })
    }
  )

  const openRouterData = await openRouterRes.json()

  const answer =
    openRouterData.choices?.[0]?.message?.content ||
    'Sorry, I could not process that.'

  const language = /[\u0600-\u06FF]/.test(query) ? 'ur' : 'en'

  return NextResponse.json({ answer, language })
}
