import React, { useState, useEffect } from 'react';
import { Timer, TimerGroup, IntervalTimer, SavedTimer } from './types';
import { TimerGroup as TimerGroupComponent } from './components/TimerGroup';
import { EditGroupModal } from './components/EditGroupModal';
import { TimerScreen } from './components/TimerScreen';
import { HomePage } from './components/HomePage';
import { Play, Pause, Save, Timer as TimerIcon, Trash, ArrowLeft } from 'lucide-react';

function App() {
  const [intervalTimers, setIntervalTimers] = useState<SavedTimer[]>(() => {
    const saved = localStorage.getItem('intervalTimers');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentTimer, setCurrentTimer] = useState<IntervalTimer>({
    id: crypto.randomUUID(),
    name: 'New Timer',
    timerGroups: [],
  });

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [currentRepetition, setCurrentRepetition] = useState(1);
  const [editingGroup, setEditingGroup] = useState<TimerGroup | null>(null);
  const [isTimerView, setIsTimerView] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    localStorage.setItem('intervalTimers', JSON.stringify(intervalTimers));
  }, [intervalTimers]);

  const addTimerGroup = () => {
    const newGroup: TimerGroup = {
      id: crypto.randomUUID(),
      name: `Group ${currentTimer.timerGroups.length + 1}`,
      timers: [],
      repetitions: 1,
      chimeSound: 'bell',
      time: {
        value: 30,
        unit: 'seconds'
      },
    };
    setCurrentTimer((prevTimer) => ({
      ...prevTimer,
      timerGroups: [...prevTimer.timerGroups, newGroup],
    }));
    setEditingGroup(newGroup);
  };

  const addTimer = (groupId: string) => {
    const newTimer: Timer = {
      id: crypto.randomUUID(),
      name: 'New Timer',
      duration: 30,
      type: 'work',
    };
    setCurrentTimer({
      ...currentTimer,
      timerGroups: currentTimer.timerGroups.map((group) =>
        group.id === groupId
          ? { ...group, timers: [...group.timers, newTimer] }
          : group
      ),
    });
  };

  const handleEditGroup = (group: TimerGroup) => {
    setEditingGroup(group);
  };

  const handleDeleteGroup = (groupId: string) => {
    setCurrentTimer({
      ...currentTimer,
      timerGroups: currentTimer.timerGroups.filter(group => group.id !== groupId)
    });
  };

  const handleSaveGroup = (editedGroup: TimerGroup) => {
    setCurrentTimer({
      ...currentTimer,
      timerGroups: currentTimer.timerGroups.map((group) =>
        group.id === editedGroup.id ? editedGroup : group
      ),
    });
    setEditingGroup(null);
  };

  const saveTimer = () => {
    const existingIndex = intervalTimers.findIndex(timer => timer.name === currentTimer.name);
    const savedTimer: SavedTimer = {
      id: existingIndex !== -1 ? intervalTimers[existingIndex].id : crypto.randomUUID(),
      name: currentTimer.name,
      intervalTimer: currentTimer,
    };

    if (existingIndex !== -1) {
      // Overwrite existing timer
      const updatedTimers = [...intervalTimers];
      updatedTimers[existingIndex] = savedTimer;
      setIntervalTimers(updatedTimers);
    } else {
      // Add new timer
      setIntervalTimers([...intervalTimers, savedTimer]);
    }
  };

  const loadTimer = (timer: SavedTimer) => {
    setCurrentTimer(timer.intervalTimer);
    setIsRunning(false);
    setCurrentTime(0);
    setActiveGroupIndex(0);
    setActiveTimerIndex(0);
    setCurrentRepetition(1);
    setIsHomePage(false);
  };

  const deleteTimer = (timerId: string) => {
    setIntervalTimers(intervalTimers.filter(timer => timer.id !== timerId));
  };

  const createNewTimer = () => {
    setCurrentTimer({
      id: crypto.randomUUID(),
      name: 'New Timer',
      timerGroups: [],
    });
    setIsHomePage(false);
  };

  const toggleTimer = () => {
    if (!isRunning && currentTimer.timerGroups.length > 0) {
      setIsTimerView(true);
    }
    setIsRunning(!isRunning);
  };

  const exitTimerView = () => {
    setIsTimerView(false);
    setIsRunning(false);
    setCurrentTime(0);
    setActiveGroupIndex(0);
    setCurrentRepetition(1);
  };

  const goToHomePage = () => {
    setIsHomePage(true);
  };

  const startTimerFromHome = (timer: SavedTimer) => {
    setCurrentTimer(timer.intervalTimer);
    setIsRunning(true);
    setCurrentTime(0);
    setActiveGroupIndex(0);
    setActiveTimerIndex(0);
    setCurrentRepetition(1);
    setIsHomePage(false);
    setIsTimerView(true);
  };

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        setCurrentTime((time) => {
          const currentGroup = currentTimer.timerGroups[activeGroupIndex];
          if (!currentGroup) return time;

          const totalTime = currentGroup.time.value * (currentGroup.time.unit === 'minutes' ? 60 : 1);

          if (time >= totalTime) {
            // Move to next repetition or group
            let nextGroupIndex = activeGroupIndex;
            let nextRepetition = currentRepetition;

            if (currentRepetition >= currentGroup.repetitions) {
              nextGroupIndex++;
              nextRepetition = 1;
            } else {
              nextRepetition++;
            }

            if (nextGroupIndex >= currentTimer.timerGroups.length) {
              setIsRunning(false);
              setIsTimerView(false);
              return 0;
            }

            setActiveGroupIndex(nextGroupIndex);
            setCurrentRepetition(nextRepetition);
            return 0;
          }

          return time + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, activeGroupIndex, currentRepetition, currentTimer]);

  if (isHomePage) {
    return <HomePage savedTimers={intervalTimers} onLoadTimer={loadTimer} onCreateNewTimer={createNewTimer} onDeleteTimer={deleteTimer} onStartTimer={startTimerFromHome} />;
  }

  if (isTimerView) {
    return (
      <TimerScreen
        timer={currentTimer}
        currentGroup={currentTimer.timerGroups[activeGroupIndex]}
        currentTime={currentTime}
        currentRepetition={currentRepetition}
        onExit={exitTimerView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToHomePage}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <TimerIcon className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Interval Timer</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={toggleTimer}
                disabled={currentTimer.timerGroups.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentTimer.timerGroups.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : isRunning
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" /> Start
                  </>
                )}
              </button>
              <button
                onClick={saveTimer}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                <Save className="w-5 h-5" /> Save Timer
              </button>
            </div>
          </div>

          <div className="mb-8">
            <input
              type="text"
              value={currentTimer.name}
              onChange={(e) => setCurrentTimer({ ...currentTimer, name: e.target.value })}
              className="text-xl font-semibold mb-4 p-2 border rounded"
            />
            {currentTimer.timerGroups.map((group) => (
              <TimerGroupComponent
                key={group.id}
                group={group}
                onEditTimer={() => {}}
                onDeleteTimer={() => {}}
                onEditGroup={handleEditGroup}
                onDeleteGroup={handleDeleteGroup}
              />
            ))}
            <button
              onClick={addTimerGroup}
              className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            >
              Add Timer Group
            </button>
          </div>
        </div>
      </div>

      {editingGroup && (
        <EditGroupModal
          group={editingGroup}
          onSave={handleSaveGroup}
          onClose={() => setEditingGroup(null)}
        />
      )}
    </div>
  );
}

export default App;
