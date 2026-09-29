import type { WizardAnswers } from '../types'
import { formatDatePtBr } from './date'

export function buildWhatsAppMessage(answers: WizardAnswers) {
  const activities = answers.activities
    .filter((activity) => activity !== 'Outros...')
    .map((activity) => `• ${activity}`)

  if (answers.activities.includes('Outros...') && answers.otherActivity.trim()) {
    activities.push(`• Outro: ${answers.otherActivity.trim()}`)
  }

  return [
    '💌 *Nosso encontro está combinado!*',
    '',
    `📅 *Data:* ${formatDatePtBr(answers.date)}`,
    `⏰ *Horário:* ${answers.time}`,
    '🍿 *O que vamos fazer:*',
    ...activities,
    '',
    '✨ Agora só falta a gente aproveitar muito.'
  ].join('\n')
}

export function buildWhatsAppUrl(answers: WizardAnswers) {
  const message = encodeURIComponent(buildWhatsAppMessage(answers))
  const rawPhone = import.meta.env.VITE_WHATSAPP_PHONE?.trim() ?? ''
  const phone = rawPhone.replace(/\D/g, '')
  const phoneQuery = phone ? `phone=${phone}&` : ''

  return `https://api.whatsapp.com/send?${phoneQuery}text=${message}`
}
