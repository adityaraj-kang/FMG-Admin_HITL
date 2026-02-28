'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useAnimate } from 'framer-motion'
import { Warning } from '@phosphor-icons/react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()
  const { theme } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [cardScope, animateCard] = useAnimate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      void animateCard(cardScope.current, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.3 })
      return
    }

    setIsLoading(true)
    setError('')

    const result = await login(email, password)

    if (result.success) {
      router.push('/')
    } else {
      setError(result.error ?? 'Invalid email or password.')
      setIsLoading(false)
      void animateCard(cardScope.current, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.3 })
    }
  }

  const logoFilter =
    theme === 'dark'
      ? 'grayscale(1) brightness(1.5)'
      : 'grayscale(1) brightness(0.1)'

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.2, 0, 0.38, 0.9] as const },
    },
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-default)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Inline keyframes for scanline and shake */}
      <style>{`
        @keyframes scanline {
          from { top: -100px; }
          to   { top: 100vh; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>

      {/* Terminal grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,77,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,0,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scanline effect */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          height: '100px',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'linear-gradient(transparent, rgba(255,77,0,0.04), transparent)',
          animation: 'scanline 8s linear infinite',
        }}
      />

      {/* Sticky header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          height: '64px',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <img
          src="/fmg-logo.png"
          alt="Find My Genie"
          style={{ height: 32, filter: logoFilter }}
        />
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-headline"
              style={{
                fontSize: '32px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              WELCOME BACK
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '16px',
                color: 'var(--text-body)',
                marginTop: '4px',
                marginBottom: 0,
              }}
            >
              Sign in to the HITL Operations Center.
            </motion.p>

            {/* Form card */}
            <motion.div variants={itemVariants}>
              <motion.div
                ref={cardScope}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginTop: '32px',
                }}
              >
                <form onSubmit={handleSubmit} noValidate>
                  {/* Email field */}
                  <div style={{ marginBottom: '20px' }}>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--text-muted)',
                        marginBottom: '6px',
                      }}
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="user@fmg.ai"
                      autoComplete="email"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 150ms, box-shadow 150ms',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--primary-main)'
                        e.currentTarget.style.boxShadow = '0 0 0 1px var(--primary-main)'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  {/* Password field */}
                  <div style={{ marginBottom: '0' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '6px',
                      }}
                    >
                      <label
                        htmlFor="password"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-jetbrains), monospace',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--text-muted)',
                        }}
                      >
                        PASSWORD
                      </label>
                      <span
                        style={{
                          color: 'var(--primary-main)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-jetbrains), monospace',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        Forgot?
                      </span>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 150ms, box-shadow 150ms',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--primary-main)'
                        e.currentTarget.style.boxShadow = '0 0 0 1px var(--primary-main)'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  {/* Error banner */}
                  {error && (
                    <div
                      style={{
                        backgroundColor: 'rgba(255,45,85,0.08)',
                        border: '1px solid rgba(255,45,85,0.2)',
                        borderRadius: '8px',
                        padding: '12px',
                        marginTop: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Warning size={16} color="var(--status-error)" weight="fill" />
                      <span
                        style={{
                          color: 'var(--status-error)',
                          fontSize: '14px',
                          fontFamily: 'var(--font-plus-jakarta), sans-serif',
                        }}
                      >
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Sign In button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1, ease: [0.2, 0, 0.38, 0.9] }}
                    style={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: 'var(--primary-main)',
                      color: 'white',
                      fontFamily: 'var(--font-plus-jakarta), sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.6 : 1,
                      marginTop: '20px',
                      transition: 'background-color 150ms',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                    onMouseEnter={e => {
                      if (!isLoading) {
                        e.currentTarget.style.backgroundColor = 'var(--primary-hover)'
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-main)'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span>Signing in</span>
                        <LoadingDots />
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>

                  {/* Footer */}
                  <p
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-jetbrains), monospace',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      opacity: 0.4,
                      marginTop: '20px',
                      marginBottom: 0,
                    }}
                  >
                    Protected by secure-shield protocol
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function LoadingDots() {
  return (
    <span
      style={{ display: 'inline-flex', gap: '2px', alignItems: 'center', marginTop: '1px' }}
    >
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'inline-block',
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  )
}
