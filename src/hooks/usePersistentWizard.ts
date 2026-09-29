import { useEffect, useState } from 'react'
import type { WizardAnswers } from '../types'

const STORAGE_KEY = 'date-proposal-wizard-state-v1'

const initialAnswers: WizardAnswers = {
  accepted: null,
  date: '',
  time: '',
  activities: [],
  otherActivity: '',
}

type StoredWizard = {
  step: number
  answers: WizardAnswers
}

export function usePersistentWizard() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<WizardAnswers>(initialAnswers)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<StoredWizard>
        if (parsed.answers) {
          setAnswers({ ...initialAnswers, ...parsed.answers })
        }
        if (typeof parsed.step === 'number' && parsed.step >= 1 && parsed.step <= 5) {
          setStep(parsed.step)
        }
      }
    } catch {
      // Estado corrompido não deve impedir a experiência.
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }))
  }, [answers, isHydrated, step])

  const reset = () => {
    setStep(1)
    setAnswers(initialAnswers)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    step,
    setStep,
    answers,
    setAnswers,
    isHydrated,
    reset,
  }
}
