
import React from 'react';
import { Task, RepeatInterval } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const getRepeatLabel = (interval: RepeatInterval) => {
    switch (interval) {
      case RepeatInterval.DAILY: return 'DLY';
      case RepeatInterval.WEEKLY: return 'WKL';
      case RepeatInterval.MONTHLY: return 'MTH';
      default: return '';
    }
  };

  return (
    <div className={`pixel-card group transition-all duration-300 relative ${task.isCompleted ? 'opacity-40 grayscale border-slate-700 bg-slate-900/50' : 'hover:border-cyan-400 bg-slate-900/80 shadow-[0_0_15px_rgba(29,78,216,0.2)]'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[8px] px-1 bg-blue-900 text-cyan-400 font-bold border border-blue-700">
              {task.missionCodename || 'UNIT-ALPHA'}
            </span>
            {task.repeatInterval !== RepeatInterval.NONE && (
              <span className="text-[8px] px-1 bg-slate-800 text-slate-400 border border-slate-700">
                {getRepeatLabel(task.repeatInterval)}
              </span>
            )}
          </div>
          <h3 className={`text-sm mb-2 ${task.isCompleted ? 'line-through text-slate-500' : 'text-blue-50'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-[9px] text-blue-300/60 leading-relaxed italic line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          {!task.isCompleted ? (
            <button
              onClick={() => onToggle(task.id)}
              className="bg-cyan-700 hover:bg-cyan-600 text-white p-2 text-[8px] pixel-border-cyan transition-colors"
              title="Complete Mission"
            >
              DONE
            </button>
          ) : (
            <button
              onClick={() => onToggle(task.id)}
              className="bg-blue-800 hover:bg-blue-700 text-white p-2 text-[8px] pixel-border transition-colors"
              title="Restore"
            >
              RST
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-950 hover:bg-red-800 text-red-200 p-2 text-[8px] border border-red-900 transition-colors"
            title="Delete"
          >
            DEL
          </button>
        </div>
      </div>
      
      {task.isCompleted && task.completedAt && (
        <div className="mt-3 text-[7px] text-blue-500 text-right font-mono">
          SECURED_{new Date(task.completedAt).getTime().toString(16).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
