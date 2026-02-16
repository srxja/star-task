
import React, { useState } from 'react';
import { RepeatInterval, Task } from '../types';
import { getMissionBriefing } from '../services/geminiService';

interface TaskFormProps {
  onAdd: (task: Task) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repeat, setRepeat] = useState<RepeatInterval>(RepeatInterval.NONE);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    const briefing = await getMissionBriefing(title);
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      repeatInterval: repeat,
      isCompleted: false,
      createdAt: Date.now(),
      missionCodename: briefing.codename,
    };

    onAdd(newTask);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="pixel-card w-full max-w-lg bg-[#0f172a] relative border-blue-600">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-400 font-bold"
        >
          [X]
        </button>
        <h2 className="text-xl mb-6 text-cyan-400 text-center">INITIATE MISSION LOG</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] mb-2 text-blue-400 tracking-widest uppercase">Target Objective</label>
            <input
              autoFocus
              className="w-full bg-[#000a1f] border-4 border-blue-900 p-3 text-sm focus:border-cyan-500 text-cyan-100 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter mission title..."
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] mb-2 text-blue-400 tracking-widest uppercase">Intel Stream</label>
            <textarea
              className="w-full bg-[#000a1f] border-4 border-blue-900 p-3 text-sm focus:border-cyan-500 text-cyan-100 outline-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mission parameters..."
            />
          </div>

          <div>
            <label className="block text-[10px] mb-2 text-blue-400 tracking-widest uppercase">Orbital Sync</label>
            <select
              className="w-full bg-[#000a1f] border-4 border-blue-900 p-3 text-sm focus:border-cyan-500 text-cyan-100 outline-none appearance-none"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value as RepeatInterval)}
            >
              <option value={RepeatInterval.NONE}>SINGLE DEPLOYMENT</option>
              <option value={RepeatInterval.DAILY}>DAILY ROTATION</option>
              <option value={RepeatInterval.WEEKLY}>WEEKLY ORBIT</option>
              <option value={RepeatInterval.MONTHLY}>MONTHLY CYCLE</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full pixel-button ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isLoading ? 'ENCRYPTING...' : 'ESTABLISH LINK'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
