import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-default':    'var(--bg-default)',
        'bg-surface':    'var(--bg-surface)',
        'bg-input':      'var(--bg-input)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'primary':       'var(--primary-main)',
        'primary-hover': 'var(--primary-hover)',
        'primary-dim':   'var(--primary-dim)',
        'text-primary':  'var(--text-primary)',
        'text-body':     'var(--text-body)',
        'text-muted':    'var(--text-muted)',
        'status-success': 'var(--status-success)',
        'status-error':   'var(--status-error)',
        'status-warning': 'var(--status-warning)',
        'status-info':    'var(--status-info)',
        // Literal genie palette for direct use without CSS var
        genie: {
          orange:       '#FF4D00',
          'orange-600': '#CC3D00',
          'orange-400': '#FF6A2B',
          black:        '#050505',
          surface:      '#121212',
          input:        '#1A1A1A',
          success:      '#00E096',
          error:        '#FF2D55',
          warning:      '#FFC043',
          info:         '#2E93FA',
        },
      },
      fontFamily: {
        headline: ['var(--font-outfit)', 'sans-serif'],
        body:     ['var(--font-plus-jakarta)', 'sans-serif'],
        mono:     ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '24px',
        full: '9999px',
      },
      transitionTimingFunction: {
        'mechanical': 'cubic-bezier(0.2, 0, 0.38, 0.9)',
        'recoil':     'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        'instant': '100ms',
        'fast':    '200ms',
        'nav':     '300ms',
      },
      boxShadow: {
        'genie-glow':    '0 0 20px rgba(255,77,0,0.35)',
        'card-light':    '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'card-elevated': '0 4px 20px rgba(0,0,0,0.12)',
      },
      animation: {
        'pulse-warm': 'pulseWarm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'timer-tick': 'timerPulse 1s ease-in-out infinite',
      },
      keyframes: {
        pulseWarm: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        timerPulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}

export default config
