import React from 'react';
import { Timer } from './Timer';
import { TimerGroup as TimerGroupType, Timer as TimerType } from '../types';
import { Repeat, Music, Clock } from 'lucide-react';

interface TimerGroupProps {
  group: TimerGroupType;
  onEditTimer: (timer: TimerType) => void;
  onDeleteTimer: (timerId: string) => void;
  onEditGroup: (group: TimerGroupType) => void;
  onDeleteGroup: (groupId: string) => void;
}

export function TimerGroup({
  group,
  onEditTimer,
  onDeleteTimer,
  onEditGroup,
  onDeleteGroup,
}: TimerGroupProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Repeat className="w-5 h-5" />
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <span className="text-sm text-gray-600">({group.repetitions} repetitions)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              {group.time.value} {group.time.unit}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Music className="w-4 h-4" />
            <span className="text-sm capitalize">{group.chimeSound}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEditGroup(group)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit Group
          </button>
          <button
            onClick={() => onDeleteGroup(group.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete Group
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {group.timers.map((timer) => (
          <Timer
            key={timer.id}
            timer={timer}
            onEdit={onEditTimer}
            onDelete={onDeleteTimer}
          />
        ))}
      </div>
    </div>
  );
}
