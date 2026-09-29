import { ArrowLeft, ArrowRight } from 'lucide-react'

type NavigationButtonsProps = {
  onBack: () => void
  onNext: () => void
  nextDisabled?: boolean
  nextLabel?: string
}

export function NavigationButtons({
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = 'Avançar',
}: NavigationButtonsProps) {
  return (
    <div className="mt-7 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 py-3 font-semibold text-rose-800 transition hover:-translate-y-0.5 hover:bg-rose-50 active:translate-y-0"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-rose-300/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 active:translate-y-0"
      >
        {nextLabel}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
