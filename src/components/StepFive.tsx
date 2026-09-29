import type { ReactNode } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  HeartHandshake,
  RotateCcw,
  Send,
  Sparkles,
} from 'lucide-react'
import type { Direction, WizardAnswers } from '../types'
import { formatDatePtBr } from '../lib/date'
import { StepShell } from './StepShell'

type StepFiveProps = {
  direction: Direction
  answers: WizardAnswers
  sent: boolean
  onEdit: (step: number) => void
  onBack: () => void
  onSend: () => void
  onReset: () => void
}

export function StepFive({
  direction,
  answers,
  sent,
  onEdit,
  onBack,
  onSend,
  onReset,
}: StepFiveProps) {
  const activities = answers.activities.filter((item) => item !== 'Outros...')
  const hasOther = answers.activities.includes('Outros...') && answers.otherActivity.trim()

  return (
    <StepShell
      eyebrow="Última etapa"
      title="Resumo do Nosso Encontro 💌"
      subtitle="Confere se está tudo do jeitinho que você quer antes de mandar."
      direction={direction}
    >
      {sent ? (
        <div className="animate-success-pop mb-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-center">
          <CheckCircle2 className="mx-auto text-emerald-600" size={36} aria-hidden="true" />
          <p className="mt-2 font-bold text-emerald-900">Tudo certo por aqui ✨</p>
          <p className="mt-1 text-sm leading-5 text-emerald-800/70">
            O WhatsApp foi aberto com a mensagem pronta para você revisar e enviar.
          </p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
        <ReviewRow
          icon={<CalendarDays size={19} />}
          label="Data"
          value={<span className="capitalize">{formatDatePtBr(answers.date)}</span>}
          onEdit={() => onEdit(2)}
        />
        <ReviewRow
          icon={<Clock3 size={19} />}
          label="Horário"
          value={answers.time}
          onEdit={() => onEdit(3)}
        />
        <ReviewRow
          icon={<HeartHandshake size={19} />}
          label="Atividade"
          value={
            <div className="space-y-1">
              {activities.map((activity) => (
                <div key={activity}>• {activity}</div>
              ))}
              {hasOther ? <div>• Outro: {answers.otherActivity.trim()}</div> : null}
            </div>
          }
          onEdit={() => onEdit(4)}
          last
        />
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-r from-rose-50 to-violet-50 p-4 text-sm leading-6 text-rose-950/65">
        <Sparkles className="mr-2 inline text-rose-500" size={17} aria-hidden="true" />
        Ao confirmar, uma mensagem formatada será aberta diretamente no WhatsApp.
      </div>

      <div className="mt-6 grid grid-cols-[auto_1fr] gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 py-4 font-semibold text-rose-800 transition hover:-translate-y-0.5 hover:bg-rose-50 active:translate-y-0"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Voltar</span>
        </button>
        <button
          type="button"
          onClick={onSend}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-5 py-4 text-base font-bold text-white shadow-xl shadow-rose-300/30 transition hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
        >
          <Send size={19} aria-hidden="true" />
          Confirmar e Enviar
        </button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mx-auto mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-rose-900/50 transition hover:bg-rose-50 hover:text-rose-900"
      >
        <RotateCcw size={15} aria-hidden="true" />
        Recomeçar formulário
      </button>
    </StepShell>
  )
}

type ReviewRowProps = {
  icon: ReactNode
  label: string
  value: ReactNode
  onEdit: () => void
  last?: boolean
}

function ReviewRow({ icon, label, value, onEdit, last = false }: ReviewRowProps) {
  return (
    <div className={`flex items-start gap-3 p-4 sm:p-5 ${last ? '' : 'border-b border-rose-100'}`}>
      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-rose-950/40">{label}</p>
        <div className="mt-1 text-sm font-semibold leading-6 text-rose-950/80 sm:text-base">
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
      >
        <Edit3 size={14} aria-hidden="true" />
        Editar
      </button>
    </div>
  )
}
