import { Clock3 } from 'lucide-react'
import type { Direction } from '../types'
import { NavigationButtons } from './NavigationButtons'
import { StepShell } from './StepShell'

const suggestedTimes = ['18:00', '19:30', '20:00', '21:00']

type StepThreeProps = {
  direction: Direction
  value: string
  onChange: (value: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepThree({
  direction,
  value,
  onChange,
  onBack,
  onNext,
}: StepThreeProps) {
  return (
    <StepShell
      eyebrow="Escolhe o clima da noite"
      title="Qual horário você prefere? ⏰"
      subtitle="Pode escolher uma sugestão ou colocar o horário perfeito para você."
      direction={direction}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {suggestedTimes.map((time) => {
          const selected = value === time
          return (
            <button
              key={time}
              type="button"
              onClick={() => onChange(time)}
              aria-pressed={selected}
              className={`rounded-2xl border px-4 py-3.5 font-bold transition ${
                selected
                  ? 'border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-300/30'
                  : 'border-rose-100 bg-white text-rose-900 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50'
              }`}
            >
              {time}
            </button>
          )
        })}
      </div>

      <div className="mt-5">
        <label htmlFor="custom-time" className="mb-2 block text-sm font-semibold text-rose-950/75">
          Ou escolha outro horário
        </label>
        <div className="relative">
          <Clock3 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
          <input
            id="custom-time"
            type="time"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-12 w-full rounded-2xl border border-rose-100 bg-white py-3 pl-11 pr-4 font-semibold text-rose-950 shadow-sm transition focus:border-rose-300"
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </StepShell>
  )
}
