'use client'

import { useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Phone, CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

interface TakeOverButtonProps {
  onTakeOver: () => void
  isActive?: boolean
}

export function TakeOverButton({ onTakeOver, isActive = false }: TakeOverButtonProps) {
  const [isHolding, setIsHolding] = useState(false)
  const progress = useMotionValue(0)
  // Full circumference for r=36: 2 * π * 36 ≈ 226
  const strokeDashoffset = useTransform(progress, [0, 1], [226, 0])

  const startHold = useCallback(() => {
    if (isActive) return
    setIsHolding(true)

    animate(progress, 1, {
      duration: 1.5,
      ease: 'linear',
      onComplete: () => {
        setIsHolding(false)
        onTakeOver()
      },
    })
  }, [isActive, progress, onTakeOver])

  const cancelHold = useCallback(() => {
    if (isActive) return
    setIsHolding(false)
    animate(progress, 0, {
      duration: 0.3,
      ease: [0.2, 0, 0.38, 0.9] as [number, number, number, number],
    })
  }, [isActive, progress])

  if (isActive) {
    return (
      <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-[rgba(0,224,150,0.06)] border border-[rgba(0,224,150,0.2)]">
        <CheckCircle size={32} weight="fill" className="text-status-success" />
        <div className="text-center">
          <p className="font-headline text-base font-semibold text-status-success mb-0.5">
            You&apos;re Live
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            You&apos;ve taken over this call
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      {/* Hold-to-activate ring */}
      <div className="relative flex items-center justify-center">
        {/* Progress ring SVG */}
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          className="absolute -rotate-90"
          style={{ overflow: 'visible' }}
        >
          {/* Track circle */}
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="3"
          />
          {/* Progress circle — strokeDashoffset is a MotionValue, passed via style */}
          <motion.circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="226"
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Button */}
        <motion.button
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
          whileTap={{ scale: 0.96 }}
          className={cn(
            'relative z-10 w-16 h-16 rounded-full',
            'flex items-center justify-center',
            'bg-[var(--primary-main)] hover:bg-[var(--primary-hover)]',
            'text-white',
            'transition-all duration-instant',
            'select-none touch-none',
            isHolding ? 'shadow-genie-glow' : 'hover:shadow-genie-glow',
            'focus-visible:outline-2 focus-visible:outline-[var(--primary-main)]'
          )}
          aria-label="Hold to take over call"
        >
          <Phone size={24} weight="fill" />
        </motion.button>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="font-headline text-sm font-semibold text-[var(--text-primary)]">
          {isHolding ? 'Hold to Confirm…' : 'Take Over Call'}
        </p>
        <p className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
          {isHolding ? 'Release to cancel' : 'Hold for 1.5s to activate'}
        </p>
      </div>
    </div>
  )
}
