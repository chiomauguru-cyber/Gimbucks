export interface GameState {
  gimbucks: number;
  xp: number;
  level: number;
  isHacked: boolean;
  liveGame?: GimkitGameInfo;
  kit?: GimkitKitInfo;
}

export interface LogEntry {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

export interface GimkitGameInfo {
  gameCode: string;
  kitId: string;
  type: string;
  active: boolean;
}

export interface GimkitQuestion {
  _id: string;
  text: string;
  answers: {
    _id: string;
    text: string;
    correct: boolean;
  }[];
}

export interface GimkitKitInfo {
  _id: string;
  name: string;
  questions: GimkitQuestion[];
}
