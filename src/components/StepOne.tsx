import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { RefusalModal } from './RefusalModal'
import { StepShell } from './StepShell'
import type { Direction } from '../types'

type StepOneProps = {
  direction: Direction
  onAccept: () => void
}

export function StepOne({ direction, onAccept }: StepOneProps) {
  const [showRefusal, setShowRefusal] = useState(false)

  return (
    <>
      <StepShell
        eyebrow="Uma pergunta importantíssima"
        title="Quer sair comigo? ✨"
        subtitle="Prometo uma proposta muito bem pensada — e talvez um pouquinho de insistência fofa."
        direction={direction}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onAccept}
            className="group relative min-h-28 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-fuchsia-500 p-5 text-left text-white shadow-lg shadow-rose-300/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Sparkles className="absolute right-4 top-4 opacity-75 transition group-hover:rotate-12 group-hover:scale-110" size={22} />
            <span className="block text-sm font-medium text-white/75">Escolha correta</span>
            <span className="mt-1 block text-2xl font-bold">Sim 💗</span>
          </button>

          <button
            type="button"
            onClick={() => setShowRefusal(true)}
            className="group relative min-h-28 overflow-hidden rounded-3xl border border-rose-200 bg-white p-5 text-left text-rose-950 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-rose-50"
          >
            <Heart className="absolute right-4 top-4 text-rose-300 transition group-hover:scale-110" size={22} />
            <span className="block text-sm font-medium text-rose-950/45">Hmmm...</span>
            <span className="mt-1 block text-2xl font-bold">Não 🙈</span>
          </button>
        </div>
      </StepShell>

      <RefusalModal
        open={showRefusal}
        onClose={() => setShowRefusal(false)}
        onAccept={() => {
          setShowRefusal(false)
          onAccept()
        }}
      />
    </>
  )
}
