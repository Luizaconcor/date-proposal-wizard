import { Check, PencilLine } from 'lucide-react'
import type { Direction } from '../types'
import { NavigationButtons } from './NavigationButtons'
import { StepShell } from './StepShell'

const activities = [
  'Ir ao cinema',
  'Ir comer em algum lugar legal',
  'Ir para a casa de alguma de nós duas',
  'Ir para um barzinho para a Duda beber',
  'Fazer alguma coisa inédita',
  'Jogar alguma coisa',
  'Outros...',
]

type StepFourProps = {
  direction: Direction
  selected: string[]
  otherActivity: string
  onToggle: (activity: string) => void
  onOtherChange: (value: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepFour({
  direction,
  selected,
  otherActivity,
  onToggle,
  onOtherChange,
  onBack,
  onNext,
}: StepFourProps) {
  const otherSelected = selected.includes('Outros...')
  const canContinue =
    selected.length > 0 && (!otherSelected || otherActivity.trim().length > 0)

  return (
    <StepShell
      eyebrow="Pode marcar mais de uma"
      title="O que você quer fazer? 🍿"
      subtitle="Vale montar combo também. Cinema + comida, barzinho + jogo... a noite é nossa."
      direction={direction}
    >
      <div className="space-y-2.5">
        {activities.map((activity) => {
          const isSelected = selected.includes(activity)
          return (
            <button
              key={activity}
              type="button"
              onClick={() => onToggle(activity)}
              aria-pressed={isSelected}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left font-semibold transition ${
                isSelected
                  ? 'border-rose-400 bg-rose-50 text-rose-950 shadow-sm'
                  : 'border-rose-100 bg-white text-rose-950/75 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
            >
              <span>{activity}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${
                  isSelected ? 'bg-rose-500 text-white' : 'bg-rose-50 text-transparent'
                }`}
              >
                <Check size={16} aria-hidden="true" />
              </span>
            </button>
          )
        })}
      </div>

      {otherSelected ? (
        <div className="mt-4 animate-step-forward">
          <label htmlFor="other-activity" className="mb-2 block text-sm font-semibold text-rose-950/75">
            Conta qual é a sua ideia
          </label>
          <div className="relative">
            <PencilLine className="pointer-events-none absolute left-4 top-4 text-rose-400" size={18} />
            <textarea
              id="other-activity"
              value={otherActivity}
              onChange={(event) => onOtherChange(event.target.value)}
              rows={3}
              maxLength={220}
              placeholder="Ex.: fazer um piquenique noturno, karaokê, aula de cerâmica..."
              className="w-full resize-none rounded-2xl border border-rose-100 bg-white py-3.5 pl-11 pr-4 text-rose-950 shadow-sm transition placeholder:text-rose-950/30 focus:border-rose-300"
            />
            <span className="absolute bottom-3 right-3 text-[11px] text-rose-950/35">
              {otherActivity.length}/220
            </span>
          </div>
        </div>
      ) : null}

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!canContinue} />
    </StepShell>
  )
}
