# Date Proposal Wizard 💌

Formulário romântico multi-etapas construído com React, TypeScript, Tailwind CSS e Lucide React.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse o endereço mostrado pelo Vite no terminal.

## Build de produção

```bash
npm run build
npm run preview
```

## WhatsApp

Por padrão, o botão final abre o WhatsApp com a mensagem pronta, sem destinatário fixo.

Para enviar para um número específico, copie `.env.example` para `.env` e configure:

```env
VITE_WHATSAPP_PHONE=5521999999999
```

Use DDI + DDD + número, apenas dígitos.

## O que está incluído

- Uma pergunta por etapa.
- Animações de entrada para avançar/voltar.
- Persistência automática das respostas no `localStorage`.
- Calendário visual próprio, sem biblioteca de date picker.
- Seleção de horários sugeridos + horário customizado.
- Seleção múltipla de atividades com campo "Outros".
- Resumo final com edição por seção.
- Integração via `api.whatsapp.com/send?text=...`.
- Layout mobile-first e suporte a `prefers-reduced-motion`.
