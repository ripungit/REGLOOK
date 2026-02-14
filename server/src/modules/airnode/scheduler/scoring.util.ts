import { nodes, nodeHeartbeats } from 'src/db/drizzle/schema';

// Define types based on the actual schema
interface NodeRow {
  id: string;
  name: string;
  baseDomain: string;
  agentKeyHash: string;
  capabilities: any; // jsonb
  buildSlotsTotal: number;
  runtimeSlotsTotal: number;
  status: string; // active|draining|disabled
  createdAt: Date;
  updatedAt: Date;
}

interface NodeHeartbeatRow {
  id: string;
  nodeId: string;
  cpuPercent: number | null;
  ramUsedMb: number | null;
  ramTotalMb: number | null;
  diskFreeGb: number | null;
  buildSlotsUsed: number | null;
  runtimeSlotsUsed: number | null;
  ts: Date;
}

// Calculate a score for a node based on various factors
// Lower scores are better (more available capacity)
export function calculateNodeScore(node: NodeRow, heartbeat: NodeHeartbeatRow | null) {
  if (!heartbeat) {
    // If no heartbeat, consider it unhealthy
    return Infinity;
  }

  // Get config values (in a real system these would come from config service)
  const MAX_CPU_PERCENT = 80;
  const MAX_RAM_PERCENT = 80;
  const MIN_DISK_FREE_GB = 10;

  // Check basic health conditions
  if (
    node.status !== 'active' ||
    (heartbeat.runtimeSlotsUsed !== null && heartbeat.runtimeSlotsUsed >= node.runtimeSlotsTotal) ||
    (heartbeat.diskFreeGb !== null && heartbeat.diskFreeGb < MIN_DISK_FREE_GB)
  ) {
    return Infinity; // Unusable node
  }

  // Calculate usage ratios
  const buildUsageRatio = heartbeat.buildSlotsUsed !== null && node.buildSlotsTotal > 0
    ? heartbeat.buildSlotsUsed / node.buildSlotsTotal
    : 0;
    
  const runtimeUsageRatio = heartbeat.runtimeSlotsUsed !== null && node.runtimeSlotsTotal > 0
    ? heartbeat.runtimeSlotsUsed / node.runtimeSlotsTotal
    : 0;
    
  const cpuPressure = heartbeat.cpuPercent !== null 
    ? heartbeat.cpuPercent / 100 
    : 0;
    
  const ramPressure = heartbeat.ramTotalMb !== null && heartbeat.ramTotalMb > 0 && heartbeat.ramUsedMb !== null
    ? heartbeat.ramUsedMb / heartbeat.ramTotalMb 
    : 0;

  // Weighted scoring formula
  // Prefer lower usage ratios and lower resource pressure
  const score = 
    (buildUsageRatio * 0.2) +
    (runtimeUsageRatio * 0.3) +  // Runtime slots are more critical
    (cpuPressure * 0.2) +
    (ramPressure * 0.3);  // RAM pressure weighted higher

  return score;
}