import React from 'react';
import { SavedTimer } from '../types';

interface HomePageProps {
  savedTimers: SavedTimer[];
  onLoadTimer: (timer: SavedTimer) => void;
  onCreateNewTimer: () => void;
  onDeleteTimer: (id: string) => void;
  onStartTimer: (timer: SavedTimer) => void; // Add this prop
}

export function HomePage({ savedTimers, onLoadTimer, onCreateNewTimer, onDeleteTimer, onStartTimer }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Select a Saved Interval Timer</h1>
          {savedTimers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTimers.map((timer) => (
                <div
                  key={timer.id}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                >
                  <h3 className="font-medium">{timer.name}</h3>
                  <p className="text-sm text-gray-600">
                    {timer.intervalTimer.timerGroups.length} groups
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => onLoadTimer(timer)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => onStartTimer(timer)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => onDeleteTimer(timer.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mb-4">No saved interval timers available.</p>
          )}
          <button
            onClick={onCreateNewTimer}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Create New Interval Timer
          </button>
        </div>
      </div>
    </div>
  );
}
