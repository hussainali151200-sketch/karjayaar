
'use client'

import { Canvas } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function AvatarPanel({ listening, startListening }: any) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-cyan-950 to-black overflow-hidden">
      <Canvas>
        <ambientLight intensity={1.5} />

        <Float speed={2}>
          <Sphere args={[1, 64, 64]}>
            <meshStandardMaterial
              color={listening ? '#22d3ee' : '#7c3aed'}
              emissive={listening ? '#22d3ee' : '#7c3aed'}
              emissiveIntensity={3}
              wireframe
            />
          </Sphere>
        </Float>
      </Canvas>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={startListening}
        className="absolute bottom-16 px-8 py-4 rounded-full bg-cyan-500 text-black font-bold shadow-2xl shadow-cyan-500/50"
      >
        {listening ? 'Listening...' : 'Talk to SHAMBU'}
      </motion.button>

      <div className="absolute top-10 text-cyan-300 text-4xl font-bold tracking-widest">
        SHAMBU
      </div>
    </div>
  )
}
