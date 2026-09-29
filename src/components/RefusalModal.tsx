import { Heart, Sparkles, X } from 'lucide-react'

type RefusalModalProps = {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

export function RefusalModal({ open, onClose, onAccept }: RefusalModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-rose-950/30 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="refusal-title"
    >
      <div className="animate-modal-pop relative w-full max-w-sm rounded-[2rem] border border-white/80 bg-white p-6 text-center shadow-2xl shadow-rose-950/20">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-rose-900/45 transition hover:bg-rose-50 hover:text-rose-900"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rose-100 to-violet-100">
          <Heart className="fill-rose-400 text-rose-500" size={30} aria-hidden="true" />
        </div>
        <h2 id="refusal-title" className="text-2xl font-bold text-rose-950">
          Opa... esse botão parece suspeito 🤨
        </h2>
        <p className="mt-3 text-sm leading-6 text-rose-950/65">
          Acho que ele apareceu por engano. A opção cientificamente mais fofa continua sendo “Sim”.
        </p>
        <button
          type="button"
          onClick={onAccept}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-rose-300/30 transition hover:-translate-y-0.5"
        >
          <Sparkles size={18} aria-hidden="true" />
          Tá bom, vou de Sim 💗
        </button>
      </div>
    </div>
  )
}
