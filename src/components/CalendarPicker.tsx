import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  isBeforeToday,
  isSameDay,
  monthNames,
  parseLocalDateKey,
  toLocalDateKey,
  weekDays,
} from '../lib/date'

type CalendarPickerProps = {
  value: string
  onChange: (date: string) => void
}

export function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const initialMonth = value ? parseLocalDateKey(value) : new Date()
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  )

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear()
    const month = visibleMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const previousMonthLastDate = new Date(year, month, 0).getDate()

    return Array.from({ length: 42 }, (_, index) => {
      const calendarDay = index - firstDay + 1

      if (calendarDay < 1) {
        return {
          date: new Date(year, month - 1, previousMonthLastDate + calendarDay),
          muted: true,
        }
      }

      if (calendarDay > lastDate) {
        return {
          date: new Date(year, month + 1, calendarDay - lastDate),
          muted: true,
        }
      }

      return { date: new Date(year, month, calendarDay), muted: false }
    })
  }, [visibleMonth])

  const selectedDate = value ? parseLocalDateKey(value) : null
  const today = new Date()
  const previousMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
  const previousMonthDisabled =
    previousMonth.getFullYear() < today.getFullYear() ||
    (previousMonth.getFullYear() === today.getFullYear() &&
      previousMonth.getMonth() < today.getMonth())

  const changeMonth = (offset: number) => {
    setVisibleMonth(
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + offset, 1),
    )
  }

  return (
    <div className="rounded-3xl border border-rose-100 bg-white/90 p-3 shadow-sm sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={previousMonthDisabled}
          className="grid h-10 w-10 place-items-center rounded-full text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-25"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <p className="font-bold text-rose-950">
            {monthNames[visibleMonth.getMonth()]}
          </p>
          <p className="text-xs text-rose-950/50">{visibleMonth.getFullYear()}</p>
        </div>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="grid h-10 w-10 place-items-center rounded-full text-rose-700 transition hover:bg-rose-50"
          aria-label="Próximo mês"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wide text-rose-950/40">
        {weekDays.map((day) => (
          <div key={day} className="py-1.5">{day}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map(({ date, muted }) => {
          const disabled = isBeforeToday(date)
          const selected = selectedDate ? isSameDay(date, selectedDate) : false
          const isToday = isSameDay(date, today)

          return (
            <button
              key={toLocalDateKey(date)}
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange(toLocalDateKey(date))
                if (muted) {
                  setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1))
                }
              }}
              className={`relative aspect-square rounded-xl text-sm font-semibold transition sm:rounded-2xl ${
                selected
                  ? 'bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white shadow-md shadow-rose-300/40'
                  : disabled
                    ? 'cursor-not-allowed text-rose-950/15'
                    : muted
                      ? 'text-rose-950/25 hover:bg-rose-50'
                      : 'text-rose-950/75 hover:-translate-y-0.5 hover:bg-rose-50'
              }`}
              aria-pressed={selected}
            >
              {date.getDate()}
              {isToday && !selected ? (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-400" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
