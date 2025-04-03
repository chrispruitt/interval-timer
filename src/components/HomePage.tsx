import React from 'react';
import { SavedTimer } from '../types';

interface HomePageProps {
  savedTimers: SavedTimer[];
  onLoadTimer: (timer: SavedTimer) => void;
  onCreateNewTimer: () => void;
}

export function HomePage({ savedTimers, onLoadTimer, onCreateNewTimer }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Select a Saved Timer</h1>
          {savedTimers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTimers.map((timer) => (
                <div
                  key={timer.id}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => onLoadTimer(timer)}
                >
                  <h3 className="font-medium">{timer.name}</h3>
                  <p className="text-sm text-gray-600">
                    {timer.intervalTimer.timerGroups.length} groups
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">No saved timers available.</p>
              <button
                onClick={onCreateNewTimer}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Create New Timer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
