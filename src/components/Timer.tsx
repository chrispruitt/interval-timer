import React from 'react';
import { Timer as TimerType } from '../types';
import { Clock, Play, Pause } from 'lucide-react';

interface TimerProps {
  timer: TimerType;
  onEdit: (timer: TimerType) => void;
  onDelete: (id: string) => void;
}

export function Timer({ timer, onEdit, onDelete }: TimerProps) {
  return (
    <div className={`p-4 rounded-lg ${timer.type === 'work' ? 'bg-blue-100' : 'bg-green-100'} mb-2`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{timer.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">{Math.floor(timer.duration / 60)}:{(timer.duration % 60).toString().padStart(2, '0')}</span>
          <button
            onClick={() => onEdit(timer)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(timer.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
