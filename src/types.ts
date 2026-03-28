export interface GameState {
  gimbucks: number;
  xp: number;
  level: number;
  isHacked: boolean;
}

export interface LogEntry {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}
