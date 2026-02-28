export interface Agent {
  id: string
  name: string
  email: string
  password: string       // plaintext for prototype only
  role: 'agent' | 'senior' | 'supervisor'
  initials: string
  avatarColor: string    // hex, used for AgentAvatar background
}

export const MOCK_AGENTS: Agent[] = [
  { id: 'agent-001', name: 'Priya Sharma',  email: 'priya@fmg.ai',   password: 'agent123', role: 'senior',     initials: 'PS', avatarColor: '#FF4D00' },
  { id: 'agent-002', name: 'Ravi Kumar',    email: 'ravi@fmg.ai',    password: 'agent123', role: 'agent',      initials: 'RK', avatarColor: '#2E93FA' },
  { id: 'agent-003', name: 'Anita Desai',   email: 'anita@fmg.ai',   password: 'agent123', role: 'agent',      initials: 'AD', avatarColor: '#00E096' },
  { id: 'agent-004', name: 'Marcus Chen',   email: 'marcus@fmg.ai',  password: 'agent123', role: 'agent',      initials: 'MC', avatarColor: '#FFC043' },
  { id: 'agent-005', name: 'Sofia Torres',  email: 'sofia@fmg.ai',   password: 'agent123', role: 'supervisor', initials: 'ST', avatarColor: '#FF2D55' },
]
