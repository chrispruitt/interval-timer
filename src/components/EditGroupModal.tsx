import React from 'react';
import { TimerGroup } from '../types';
import { X } from 'lucide-react';

interface EditGroupModalProps {
  group: TimerGroup;
  onSave: (group: TimerGroup) => void;
  onClose: () => void;
}

export function EditGroupModal({ group, onSave, onClose }: EditGroupModalProps) {
  const [editedGroup, setEditedGroup] = React.useState<TimerGroup>({ ...group });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedGroup);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Timer Group</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={editedGroup.name}
              onChange={(e) => setEditedGroup({ ...editedGroup, name: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                value={editedGroup.time.value}
                onChange={(e) => setEditedGroup({
                  ...editedGroup,
                  time: { ...editedGroup.time, value: parseInt(e.target.value) }
                })}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={editedGroup.time.unit}
                onChange={(e) => setEditedGroup({
                  ...editedGroup,
                  time: { ...editedGroup.time, unit: e.target.value as 'seconds' | 'minutes' }
                })}
                className="w-32 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repetitions
            </label>
            <input
              type="number"
              min="1"
              value={editedGroup.repetitions}
              onChange={(e) => setEditedGroup({ ...editedGroup, repetitions: parseInt(e.target.value) })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chime Sound
            </label>
            <select
              value={editedGroup.chimeSound}
              onChange={(e) => setEditedGroup({ ...editedGroup, chimeSound: e.target.value as TimerGroup['chimeSound'] })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bell">Bell</option>
              <option value="beep">Beep</option>
              <option value="whistle">Whistle</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
