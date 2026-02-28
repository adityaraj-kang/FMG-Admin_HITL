// ─── Types ────────────────────────────────────────────────────────────────────

export type ServiceType = 'Towing' | 'Plumbing' | 'HVAC' | 'Electrical' | 'Locksmith'

export type CallStatus = 'Active' | 'Escalated' | 'Attention Needed'

export type EscalationReason = 'Time exceeded' | 'Agent escalated' | 'Vendor requested'

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical'

export interface TranscriptEntry {
  id: string
  timestamp: string    // ISO string — display as HH:MM:SS
  speaker: 'Agent' | 'Vendor'
  text: string
}

export interface CallRecord {
  id: string
  callId?: string       // alias for id — some components use this field
  userName: string
  userPhone: string
  serviceType: ServiceType
  vendorName: string
  vendorPhone: string
  location: string
  urgencyLevel: UrgencyLevel
  serviceDescription: string
  startTime: string    // ISO string — used to compute live duration
  duration?: string    // pre-computed duration string (MM:SS or HH:MM:SS)
  status: CallStatus
  escalationReason?: EscalationReason
  transcript: TranscriptEntry[]
  assignedAgentId?: string    // which agent owns this call
  handledAt?: string          // ISO string — when an agent took over
}

export interface PricingSubmission {
  callId: string
  priceQuoted: number
  estimatedTime: string
  vendorNotes: string
}

// ─── Detailed transcript for call-001 (18 entries) ────────────────────────────

const now = Date.now()

const detailedTranscript: TranscriptEntry[] = [
  {
    id: 't-001',
    timestamp: new Date(now - 7 * 60 * 1000).toISOString(),
    speaker: 'Agent',
    text: "Hi, I'm calling from Find My Genie on behalf of Marcus Webb. He needs a flatbed tow from 2401 Commerce Street in Dallas to the nearest certified shop. Is this something FastTow can handle right now?",
  },
  {
    id: 't-002',
    timestamp: new Date(now - 6 * 60 * 1000 - 40 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Yeah we can do that. What kind of vehicle?",
  },
  {
    id: 't-003',
    timestamp: new Date(now - 6 * 60 * 1000 - 20 * 1000).toISOString(),
    speaker: 'Agent',
    text: "It's a 2019 Honda Accord, four-door sedan. The vehicle is disabled on the right shoulder, non-running condition.",
  },
  {
    id: 't-004',
    timestamp: new Date(now - 6 * 60 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Okay we got a flatbed available. What's the destination shop?",
  },
  {
    id: 't-005',
    timestamp: new Date(now - 5 * 60 * 1000 - 30 * 1000).toISOString(),
    speaker: 'Agent',
    text: "The customer is requesting the nearest certified Honda dealership or authorized service center within a 10 mile radius.",
  },
  {
    id: 't-006',
    timestamp: new Date(now - 5 * 60 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Closest would be Park Place Honda over on Lemmon Ave. That's about 4.2 miles. We can tow there.",
  },
  {
    id: 't-007',
    timestamp: new Date(now - 4 * 60 * 1000 - 30 * 1000).toISOString(),
    speaker: 'Agent',
    text: "That works. Can you confirm availability and give me an estimated arrival time at the pickup location?",
  },
  {
    id: 't-008',
    timestamp: new Date(now - 4 * 60 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Driver can be there in about 25 to 30 minutes.",
  },
  {
    id: 't-009',
    timestamp: new Date(now - 3 * 60 * 1000 - 30 * 1000).toISOString(),
    speaker: 'Agent',
    text: "Perfect. And what's the total price for the flatbed tow, including the 4.2-mile destination haul?",
  },
  {
    id: 't-010',
    timestamp: new Date(now - 3 * 60 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Base hookup is $85, then $4.50 per mile after the first 5. So to Park Place it'd be around $85 total since it's under 5 miles.",
  },
  {
    id: 't-011',
    timestamp: new Date(now - 2 * 60 * 1000 - 30 * 1000).toISOString(),
    speaker: 'Agent',
    text: "Understood. Does that $85 include all fees, or are there any additional charges for highway pickup or after-hours service?",
  },
  {
    id: 't-012',
    timestamp: new Date(now - 2 * 60 * 1000 - 12 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "There might be a $15 highway access fee. So realistically $100 out the door.",
  },
  {
    id: 't-013',
    timestamp: new Date(now - 2 * 60 * 1000).toISOString(),
    speaker: 'Agent',
    text: "Got it, $100 total. I also want to confirm — does FastTow accept digital payment through the Find My Genie platform, or does the driver require direct payment?",
  },
  {
    id: 't-014',
    timestamp: new Date(now - 1 * 60 * 1000 - 42 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Driver takes cash or card on scene. We don't have a Find My Genie account set up.",
  },
  {
    id: 't-015',
    timestamp: new Date(now - 1 * 60 * 1000 - 30 * 1000).toISOString(),
    speaker: 'Agent',
    text: "That's fine. I'll communicate the payment method to the customer. One more thing — can the driver call Marcus directly at least 10 minutes before arrival at +1 555 201 4832?",
  },
  {
    id: 't-016',
    timestamp: new Date(now - 1 * 60 * 1000 - 12 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Yeah, sure. We always do that. What was the number again?",
  },
  {
    id: 't-017',
    timestamp: new Date(now - 60 * 1000).toISOString(),
    speaker: 'Agent',
    text: "It's 555-201-4832. Marcus Webb. He's standing by the vehicle on the right shoulder of Commerce Street near the I-35 on-ramp.",
  },
  {
    id: 't-018',
    timestamp: new Date(now - 40 * 1000).toISOString(),
    speaker: 'Vendor',
    text: "Got it. Alright, dispatching now. Driver will call him before arrival. Anything else?",
  },
]

// ─── Named const for the detailed demo call ────────────────────────────────────

const CALL_001: CallRecord = {
  id: 'call-001',
  callId: 'call-001',
  userName: 'Marcus Webb',
  userPhone: '+1 (555) 201-4832',
  serviceType: 'Towing',
  vendorName: 'FastTow Dallas',
  vendorPhone: '+1 (214) 889-3301',
  location: '2401 Commerce St, Dallas TX 75201',
  urgencyLevel: 'High',
  serviceDescription: 'Car broke down on I-35, needs flatbed tow to nearest certified Honda shop',
  startTime: new Date(now - 7 * 60 * 1000).toISOString(),
  status: 'Attention Needed',
  escalationReason: 'Time exceeded',
  transcript: detailedTranscript,
  assignedAgentId: 'agent-001',
  handledAt: new Date(now - 6 * 60 * 1000).toISOString(),
}

// ─── Mock data generation helpers ────────────────────────────────────────────

const customerNames = [
  'James Wilson', 'Maria Garcia', 'Robert Chen', 'Sarah Johnson', 'David Kim',
  'Emily Patel', 'Michael Torres', 'Jessica Lee', 'Christopher Brown', 'Amanda Martinez',
  'Daniel Taylor', 'Ashley Anderson', 'Matthew Thompson', 'Stephanie White', 'Andrew Harris',
  'Michelle Clark', 'Joshua Lewis', 'Kimberly Hall', 'Ryan Allen', 'Nicole Young',
  'Brandon Scott', 'Megan King', 'Tyler Wright', 'Brittany Lopez', 'Jacob Hill',
  'Samantha Green', 'Nathan Adams', 'Kayla Baker', 'Christian Nelson', 'Amber Carter',
]

const vendorPools: Record<string, string[]> = {
  'Towing':     ['City Towing Services', 'RoadSide Heroes', 'TowMaster Pro', 'Eagle Towing', 'Highway Helper', 'RapidTow Inc'],
  'Plumbing':   ['QuickFix Plumbing', 'PipeWorks Inc', 'FlowRight Plumbing', 'HydroFix Plumbing', 'ClearFlow Plumbing', 'DrainPro Plumbing'],
  'HVAC':       ['ProHVAC Solutions', 'CoolAir Systems', 'Arctic HVAC', 'ClimateControl Pro', 'ComfortZone HVAC', 'FreezePoint HVAC'],
  'Electrical': ['Metro Electrical Co', 'PowerLine Electric', 'Spark Electrical', 'Bright Spark Electric', 'PowerUp Electric', 'WireWise Electrical'],
  'Locksmith':  ['FastLock & Key', 'KeyMaster Locksmith', 'SafeLock Services', 'InstantKey Solutions', 'KeyQuick Locksmith', 'OpenSesame Locks'],
}

const locations = [
  'Austin, TX', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Denver, CO', 'Seattle, WA', 'Nashville, TN', 'Portland, OR', 'Las Vegas, NV',
  'Boston, MA', 'Atlanta, GA', 'Miami, FL', 'Minneapolis, MN', 'New Orleans, LA',
  'Sacramento, CA', 'Tampa, FL', 'Kansas City, MO', 'Orlando, FL', 'Cleveland, OH',
  'Salt Lake City, UT', 'Raleigh, NC', 'Pittsburgh, PA', 'Indianapolis, IN', 'Columbus, OH',
]

const serviceTypes: ServiceType[] = ['Towing', 'Plumbing', 'HVAC', 'Electrical', 'Locksmith']

const serviceDescriptions: Record<ServiceType, string[]> = {
  Towing: [
    'Vehicle disabled on highway shoulder, needs flatbed tow',
    'Car broke down at intersection, blocking traffic',
    'Flat tire on freeway, vehicle needs to be towed to nearest shop',
    'Engine failure on residential street, needs tow',
    'Vehicle in ditch after minor accident, needs recovery tow',
  ],
  Plumbing: [
    'Burst pipe under kitchen sink, water flooding floor',
    'Toilet overflowing and will not stop, water damage risk',
    'Water heater leaking from bottom, no hot water',
    'Slow drains throughout house, possible blockage',
    'Outdoor spigot broken, water spraying uncontrollably',
  ],
  HVAC: [
    'AC unit not cooling, indoor temperature rising rapidly',
    'Furnace not igniting, cold weather expected overnight',
    'Heat pump making loud grinding noise, system shutting off',
    'Thermostat unresponsive, system not turning on',
    'AC blowing warm air, refrigerant leak suspected',
  ],
  Electrical: [
    'Main breaker tripped, half the house has no power',
    'Burning smell from outlet, potential arc flash risk',
    'Flickering lights throughout home, possible loose connection',
    'GFCI outlets not resetting, no power in bathrooms',
    'Electric panel buzzing, sparks observed from breaker',
  ],
  Locksmith: [
    'Locked out of house, keys left inside',
    'Car lockout in parking lot, keys visible inside',
    'Door lock broken, unable to secure property',
    'Safe combination forgotten, need professional unlock',
    'New tenant needs all locks re-keyed immediately',
  ],
}

const vendorPhoneAreaCodes = ['214', '512', '713', '469', '972', '310', '323', '773', '312', '602']

function pickPhone(seed: number): string {
  const area = vendorPhoneAreaCodes[seed % vendorPhoneAreaCodes.length]
  const mid = String(100 + ((seed * 37) % 900)).padStart(3, '0')
  const last = String(1000 + ((seed * 73) % 9000)).padStart(4, '0')
  return `+1 (${area}) ${mid}-${last}`
}

function formatDuration(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Seeded pseudo-random number (deterministic so server/client match)
// Uses an integer hash mixing function (Murmur-inspired) that treats (seed, offset)
// as a 2D hash input, producing independent streams for each offset value.
function seededRand(seed: number, offset: number): number {
  let h = (seed * 2654435761 + offset * 40503) >>> 0
  h ^= h >>> 16
  h = Math.imul(h, 0x45d9f3b) >>> 0
  h ^= h >>> 16
  return (h >>> 0) / 0x100000000
}

function generateMockCalls(count: number): CallRecord[] {
  const agentIds = ['agent-001', 'agent-002', 'agent-003', 'agent-004', 'agent-005']
  const calls: CallRecord[] = []

  for (let i = 0; i < count; i++) {
    const index = i + 1001   // IDs start at call-1001

    // Deterministic "random" values based on index
    const r0 = seededRand(index, 0)
    const r1 = seededRand(index, 1)
    const r2 = seededRand(index, 2)
    const r3 = seededRand(index, 3)
    const r4 = seededRand(index, 4)
    const r5 = seededRand(index, 5)
    const r6 = seededRand(index, 6)
    const r7 = seededRand(index, 7)

    // Pick fields from pools
    const userName = customerNames[Math.floor(r0 * customerNames.length)]
    const location = locations[Math.floor(r2 * locations.length)]
    const serviceType = serviceTypes[i % serviceTypes.length]   // cycle through service types
    const pool = vendorPools[serviceType]
    const vendorName = pool[Math.floor(r1 * pool.length)]

    // Urgency: ~20% critical, ~30% high, ~35% medium, ~15% low
    let urgencyLevel: UrgencyLevel
    const urgencyRoll = r3
    if (urgencyRoll < 0.20) {
      urgencyLevel = 'Critical'
    } else if (urgencyRoll < 0.50) {
      urgencyLevel = 'High'
    } else if (urgencyRoll < 0.85) {
      urgencyLevel = 'Medium'
    } else {
      urgencyLevel = 'Low'
    }

    // Status: ~10% attention_needed, ~5% escalated, ~85% active
    let status: CallStatus
    const statusRoll = r4
    if (statusRoll < 0.10) {
      status = 'Attention Needed'
    } else if (statusRoll < 0.15) {
      status = 'Escalated'
    } else {
      status = 'Active'
    }

    // Escalation reason (only for non-active statuses)
    let escalationReason: EscalationReason | undefined
    if (status !== 'Active') {
      const reasons: EscalationReason[] = ['Time exceeded', 'Agent escalated', 'Vendor requested']
      escalationReason = reasons[Math.floor(r5 * reasons.length)]
    }

    // Agent assignment:
    // ~10% of attention/escalated calls have NO assigned agent (unassigned)
    // All active calls get an agent (round-robin)
    let assignedAgentId: string | undefined
    let handledAt: string | undefined

    if (status !== 'Active') {
      // For attention/escalated: ~10% unassigned
      const unassignedRoll = r6
      if (unassignedRoll >= 0.10) {
        assignedAgentId = agentIds[i % agentIds.length]
        handledAt = new Date(now - Math.floor(r7 * 5 * 60 * 1000)).toISOString()
      }
      // else: unassigned (undefined)
    } else {
      // Active calls: always assigned, round-robin
      assignedAgentId = agentIds[i % agentIds.length]
      handledAt = new Date(now - Math.floor(r7 * 8 * 60 * 1000)).toISOString()
    }

    // startTime: random between 30 seconds and 12 minutes ago
    const minMs = 30 * 1000
    const maxMs = 12 * 60 * 1000
    const elapsedMs = minMs + Math.floor(seededRand(index, 8) * (maxMs - minMs))
    const startTime = new Date(now - elapsedMs).toISOString()
    const duration = formatDuration(elapsedMs)

    // Service description
    const descPool = serviceDescriptions[serviceType]
    const serviceDescription = descPool[Math.floor(seededRand(index, 9) * descPool.length)]

    const id = `call-${index}`
    calls.push({
      id,
      callId: id,
      userName,
      userPhone: pickPhone(index),
      serviceType,
      vendorName,
      vendorPhone: pickPhone(index + 500),
      location,
      urgencyLevel,
      serviceDescription,
      startTime,
      duration,
      status,
      escalationReason,
      transcript: [],
      assignedAgentId,
      handledAt,
    })
  }

  return calls
}

// ─── Primary export: call-001 first, then 999 generated calls ────────────────

export const mockCalls: CallRecord[] = [CALL_001, ...generateMockCalls(999)]

// ─── Derived helpers ───────────────────────────────────────────────────────────

export function getCallById(id: string): CallRecord | undefined {
  return mockCalls.find(c => c.id === id)
}

export function getAttentionCalls(): CallRecord[] {
  return mockCalls.filter(c => c.status === 'Attention Needed' || c.status === 'Escalated')
}

export function getMyQueueCalls(agentId: string): CallRecord[] {
  return mockCalls.filter(c => c.assignedAgentId === agentId)
}

export function getUnassignedCalls(): CallRecord[] {
  return mockCalls.filter(c => !c.assignedAgentId)
}
