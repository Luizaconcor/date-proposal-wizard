import { CalendarDays } from 'lucide-react'
import type { Direction } from '../types'
import { formatDatePtBr } from '../lib/date'
import { CalendarPicker } from './CalendarPicker'
import { NavigationButtons } from './NavigationButtons'
import { StepShell } from './StepShell'

type StepTwoProps = {
  direction: Direction
  value: string
  onChange: (value: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepTwo({ direction, value, onChange, onBack, onNext }: StepTwoProps) {
  return (
    <StepShell
      eyebrow="Agora ficou sério"
      title="Quando você pode? 📅"
      subtitle="Escolhe um dia bom e eu cuido do resto da logística."
      direction={direction}
    >
      <CalendarPicker value={value} onChange={onChange} />

      {value ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-900">
          <CalendarDays className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
          <span>
            Perfeito: <strong className="capitalize">{formatDatePtBr(value)}</strong>.
          </span>
        </div>
      ) : null}

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!value}
      />
    </StepShell>
  )
}
