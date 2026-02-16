
export enum RepeatInterval {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  repeatInterval: RepeatInterval;
  isCompleted: boolean;
  createdAt: number;
  completedAt?: number;
  missionCodename?: string;
}

export interface MissionBriefing {
  codename: string;
  motivationalQuote: string;
}
