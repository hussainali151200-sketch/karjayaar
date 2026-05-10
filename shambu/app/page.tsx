
'use client'

import { useState } from 'react'
import AvatarPanel from '@/components/AvatarPanel'
import ResultsPanel from '@/components/ResultsPanel'

export default function Home() {
  const [listening, setListening] = useState(false)
  const [response, setResponse] = useState('')
  const [query, setQuery] = useState('')

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    const recognition = new SpeechRecognition()

    recognition.lang = 'en-US'
    recognition.continuous = false

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)

      const res = await fetch('/api/shambu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: transcript })
      })

      const data = await res.json()

      setResponse(data.answer)

      const utterance = new SpeechSynthesisUtterance(data.answer)
      utterance.lang = data.language === 'ur' ? 'ur-PK' : 'en-US'
      speechSynthesis.speak(utterance)
    }

    recognition.start()
  }

  return (
    <main className="w-screen h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 border-r border-cyan-500/20">
        <AvatarPanel listening={listening} startListening={startListening} />
      </div>

      <div className="w-full md:w-1/2">
        <ResultsPanel query={query} response={response} />
      </div>
    </main>
  )
}
