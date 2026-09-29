import { Heart } from 'lucide-react'
import { useState } from 'react'
import { ProgressBar } from './components/ProgressBar'
import { StepFive } from './components/StepFive'
import { StepFour } from './components/StepFour'
import { StepOne } from './components/StepOne'
import { StepThree } from './components/StepThree'
import { StepTwo } from './components/StepTwo'
import { usePersistentWizard } from './hooks/usePersistentWizard'
import { buildWhatsAppUrl } from './lib/whatsapp'
import type { Direction } from './types'

const TOTAL_STEPS = 5

export default function App() {
  const { step, setStep, answers, setAnswers, isHydrated, reset } = usePersistentWizard()
  const [direction, setDirection] = useState<Direction>('forward')
  const [sent, setSent] = useState(false)

  const goTo = (target: number) => {
    setDirection(target < step ? 'backward' : 'forward')
    setStep(target)
  }

  const goBack = () => goTo(Math.max(1, step - 1))
  const goNext = () => goTo(Math.min(TOTAL_STEPS, step + 1))

  const update = <K extends keyof typeof answers>(key: K, value: (typeof answers)[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  const handleActivityToggle = (activity: string) => {
    setAnswers((current) => {
      const exists = current.activities.includes(activity)
      return {
        ...current,
        activities: exists
          ? current.activities.filter((item) => item !== activity)
          : [...current.activities, activity],
        otherActivity:
          activity === 'Outros...' && exists ? '' : current.otherActivity,
      }
    })
  }

  const handleSend = () => {
    setSent(true)
    const url = buildWhatsAppUrl(answers)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleReset = () => {
    setDirection('backward')
    setSent(false)
    reset()
  }

  if (!isHydrated) {
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-rose-900/50">
          <Heart className="animate-pulse fill-rose-300 text-rose-400" size={18} />
          Preparando o convite...
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute -left-28 top-40 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-24 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-2xl flex-col sm:min-h-[calc(100vh-4rem)]">
        <header className="mb-6 sm:mb-8">
          <div className="mb-5 flex items-center justify-center gap-2 text-sm font-bold tracking-tight text-rose-950/70">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow-sm">
              <Heart className="fill-rose-400 text-rose-500" size={16} aria-hidden="true" />
            </span>
            date proposal
          </div>
          <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
        </header>

        <div className="flex flex-1 items-center py-2" key={step}>
          {step === 1 ? (
            <StepOne
              direction={direction}
              onAccept={() => {
                update('accepted', true)
                goNext()
              }}
            />
          ) : null}

          {step === 2 ? (
            <StepTwo
              direction={direction}
              value={answers.date}
              onChange={(value) => update('date', value)}
              onBack={goBack}
              onNext={goNext}
            />
          ) : null}

          {step === 3 ? (
            <StepThree
              direction={direction}
              value={answers.time}
              onChange={(value) => update('time', value)}
              onBack={goBack}
              onNext={goNext}
            />
          ) : null}

          {step === 4 ? (
            <StepFour
              direction={direction}
              selected={answers.activities}
              otherActivity={answers.otherActivity}
              onToggle={handleActivityToggle}
              onOtherChange={(value) => update('otherActivity', value)}
              onBack={goBack}
              onNext={goNext}
            />
          ) : null}

          {step === 5 ? (
            <StepFive
              direction={direction}
              answers={answers}
              sent={sent}
              onEdit={goTo}
              onBack={goBack}
              onSend={handleSend}
              onReset={handleReset}
            />
          ) : null}
        </div>

        <footer className="mt-6 text-center text-xs text-rose-950/35">
          Feito com intenção, carinho e um pouquinho de pressão romântica. 💕
        </footer>
      </div>
    </main>
  )
}
