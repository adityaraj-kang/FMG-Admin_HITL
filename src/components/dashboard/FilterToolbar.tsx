'use client'

export interface CallFilters {
  search: string
  status: 'all' | 'Active' | 'Escalated' | 'Attention Needed'
  service: 'all' | 'Towing' | 'Plumbing' | 'HVAC' | 'Electrical' | 'Locksmith'
  urgency: 'all' | 'Critical' | 'High' | 'Medium' | 'Low'
}

export const DEFAULT_FILTERS: CallFilters = {
  search: '',
  status: 'all',
  service: 'all',
  urgency: 'all',
}

interface FilterToolbarProps {
  filters: CallFilters
  onChange: (filters: CallFilters) => void
}

export function FilterToolbar({ filters, onChange }: FilterToolbarProps) {
  const isFiltered =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.service !== 'all' ||
    filters.urgency !== 'all'

  return (
    <div
      className="flex items-center gap-3 px-6 py-3 border-b border-[var(--border-subtle)] bg-bg-surface flex-wrap"
    >
      {/* Search Input */}
      <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 200 }}>
        <svg
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
          width="16"
          height="16"
          viewBox="0 0 256 256"
          fill="var(--text-muted)"
        >
          <path d="M229.66,218.34l-50.07-50.07a88.13,88.13,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, vendor, location…"
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          style={{
            height: 40,
            width: '100%',
            paddingLeft: 36,
            paddingRight: 12,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 12,
          }}
        />
      </div>

      {/* Status Dropdown */}
      <select
        value={filters.status}
        onChange={e =>
          onChange({ ...filters, status: e.target.value as CallFilters['status'] })
        }
        style={{
          height: 40,
          padding: '0 12px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 6,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        <option value="all">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Escalated">Escalated</option>
        <option value="Attention Needed">Attention Needed</option>
      </select>

      {/* Service Dropdown */}
      <select
        value={filters.service}
        onChange={e =>
          onChange({ ...filters, service: e.target.value as CallFilters['service'] })
        }
        style={{
          height: 40,
          padding: '0 12px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 6,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        <option value="all">All Services</option>
        <option value="Towing">Towing</option>
        <option value="Plumbing">Plumbing</option>
        <option value="HVAC">HVAC</option>
        <option value="Electrical">Electrical</option>
        <option value="Locksmith">Locksmith</option>
      </select>

      {/* Urgency Dropdown */}
      <select
        value={filters.urgency}
        onChange={e =>
          onChange({ ...filters, urgency: e.target.value as CallFilters['urgency'] })
        }
        style={{
          height: 40,
          padding: '0 12px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 6,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        <option value="all">All Urgency</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Clear Filters Button */}
      {isFiltered && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          style={{
            height: 40,
            padding: '0 12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 11,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          × Clear all
        </button>
      )}
    </div>
  )
}
