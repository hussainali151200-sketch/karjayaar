
'use client'

import { motion } from 'framer-motion'

export default function ResultsPanel({ query, response }: any) {
  return (
    <div className="h-full overflow-y-auto p-8 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6 shadow-2xl"
      >
        <div className="text-cyan-400 text-sm mb-3 uppercase tracking-widest">
          User Query
        </div>

        <div className="text-white text-2xl mb-6">{query}</div>

        <div className="text-cyan-400 text-sm mb-3 uppercase tracking-widest">
          SHAMBU Response
        </div>

        <div className="text-gray-200 leading-8 whitespace-pre-wrap text-lg">
          {response}
        </div>
      </motion.div>
    </div>
  )
}
