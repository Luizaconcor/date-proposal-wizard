type ProgressBarProps = {
  step: number
  totalSteps: number
}

export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progress = Math.round((step / totalSteps) * 100)

  return (
    <div className="w-full" aria-label={`Progresso: ${progress}%`}>
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-rose-900/60">
        <span>Etapa {step} de {totalSteps}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/80 shadow-inner ring-1 ring-rose-900/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
