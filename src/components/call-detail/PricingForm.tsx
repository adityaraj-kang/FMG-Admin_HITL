'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

interface PricingFormProps {
  callId: string
}

export function PricingForm({ callId }: PricingFormProps) {
  const [price, setPrice] = useState('')
  const [eta, setEta] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!price || !eta) return

    setIsSubmitting(true)

    // Simulate submission
    await new Promise<void>(resolve => setTimeout(resolve, 800))

    const submission = {
      callId,
      priceQuoted: parseFloat(price),
      estimatedTime: eta,
      vendorNotes: notes,
    }
    console.log('[HITL] Pricing submitted to orchestrator:', submission)

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0.38, 0.9] as [number, number, number, number] }}
        className="flex flex-col items-center gap-3 p-6 text-center rounded-md bg-[rgba(0,224,150,0.06)] border border-[rgba(0,224,150,0.2)]"
      >
        <CheckCircle size={28} weight="fill" className="text-[var(--status-success)]" />
        <div>
          <p className="font-headline text-sm font-semibold text-[var(--status-success)] mb-0.5">
            Submitted to Orchestrator
          </p>
          <p className="font-mono text-[10px] text-[var(--text-muted)]">
            ${parseFloat(price).toFixed(2)} · {eta}
          </p>
        </div>
      </motion.div>
    )
  }

  const inputClass = cn(
    'w-full px-3 py-2.5 rounded-sm',
    'bg-bg-input border border-border-subtle',
    'text-[var(--text-primary)] text-sm font-body',
    'placeholder:text-[var(--text-muted)]',
    'focus:outline-none focus:border-[var(--primary-main)]',
    'transition-colors duration-instant'
  )

  const labelClass = 'block font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5'

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0.38, 0.9] as [number, number, number, number] }}
      className="p-4 space-y-4"
    >
      <h4 className="font-mono text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider pb-2 border-b border-border-subtle">
        Submit Pricing
      </h4>

      {/* Price field */}
      <div>
        <label className={labelClass}>Price Quoted</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-[var(--text-muted)]">
            $
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className={cn(inputClass, 'pl-7')}
            required
          />
        </div>
      </div>

      {/* ETA field */}
      <div>
        <label className={labelClass}>Estimated Arrival / Completion</label>
        <input
          type="text"
          placeholder="e.g. 25 minutes, 3:30 PM"
          value={eta}
          onChange={e => setEta(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Notes field */}
      <div>
        <label className={labelClass}>Vendor Conditions / Notes</label>
        <textarea
          placeholder="Payment terms, access requirements, special conditions…"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !price || !eta}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1, ease: [0.2, 0, 0.38, 0.9] as [number, number, number, number] }}
        className={cn(
          'w-full py-3 rounded-sm',
          'font-body text-sm font-semibold',
          'transition-all duration-fast',
          price && eta && !isSubmitting
            ? 'bg-[var(--primary-main)] hover:bg-[var(--primary-hover)] text-white cursor-pointer'
            : 'bg-bg-input text-[var(--text-muted)] cursor-not-allowed'
        )}
      >
        {isSubmitting ? 'Submitting…' : 'Submit to Orchestrator'}
      </motion.button>
    </motion.form>
  )
}
