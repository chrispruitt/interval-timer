export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  type: 'work' | 'rest';
}

export interface TimerGroup {
  id: string;
  name: string;
  timers: Timer[];
  repetitions: number;
  chimeSound: 'bell' | 'beep' | 'whistle';
  time: {
    value: number;
    unit: 'seconds' | 'minutes';
  };
}

export interface IntervalTimer {
  id: string;
  name: string;
  timerGroups: TimerGroup[];
}

export interface SavedTimer {
  id: string;
  name: string;
  intervalTimer: IntervalTimer;
}
