import type { ReactNode } from 'react'
import type { Direction } from '../types'

type StepShellProps = {
  eyebrow: string
  title: string
  subtitle?: string
  direction: Direction
  children: ReactNode
}

export function StepShell({
  eyebrow,
  title,
  subtitle,
  direction,
  children,
}: StepShellProps) {
  return (
    <section
      className={`mx-auto w-full max-w-xl ${
        direction === 'forward' ? 'animate-step-forward' : 'animate-step-backward'
      }`}
    >
      <div className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur-xl sm:p-7">
        <div className="mb-7 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-500/80">
            {eyebrow}
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-rose-950 sm:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-rose-950/60 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
