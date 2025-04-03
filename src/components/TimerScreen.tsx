import React from 'react';
import { TimerGroup, IntervalTimer } from '../types';
import { ArrowLeft, Timer as TimerIcon } from 'lucide-react';

interface TimerScreenProps {
  timer: IntervalTimer;
  currentGroup: TimerGroup;
  currentTime: number;
  currentRepetition: number;
  onExit: () => void;
}

export function TimerScreen({
  timer,
  currentGroup,
  currentTime,
  currentRepetition,
  onExit,
}: TimerScreenProps) {
  const totalTime = currentGroup.time.value * (currentGroup.time.unit === 'minutes' ? 60 : 1);
  const progress = (currentTime / totalTime) * 100;
  const timeLeft = totalTime - currentTime;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getNextGroupName = () => {
    if (!timer || !timer.groups) {
      return 'End';
    }
    const currentIndex = timer.groups.findIndex(group => group.id === currentGroup.id);
    if (currentIndex === -1 || currentIndex === timer.groups.length - 1) {
      return 'End';
    }
    return timer.groups[currentIndex + 1].name;
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Exit
            </button>
            <div className="flex items-center gap-2">
              <TimerIcon className="w-6 h-6" />
              <h1 className="text-xl font-bold">{timer ? timer.name : 'Timer'}</h1>
            </div>
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-2">{currentGroup.name}</h2>
              <p className="text-center text-gray-600">
                Repetition {currentRepetition} of {currentGroup.repetitions}
              </p>
            </div>

            <div className="mb-8">
              <div className="text-6xl font-bold text-center mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="text-center text-gray-600">
              <p>Next: {getNextGroupName()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
