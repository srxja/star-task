
import React, { useState, useEffect, useMemo } from 'react';
import StarBackground from './components/StarBackground';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import { Task, RepeatInterval } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('star-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'ACTIVE' | 'ARCHIVE'>('ACTIVE');

  useEffect(() => {
    localStorage.setItem('star-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const activeTasks = useMemo(() => 
    tasks.filter(t => !t.isCompleted).sort((a, b) => b.createdAt - a.createdAt), 
  [tasks]);

  const completedTasks = useMemo(() => 
    tasks.filter(t => t.isCompleted).sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0)), 
  [tasks]);

  const addTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isCompleting = !t.isCompleted;
        return {
          ...t,
          isCompleted: isCompleting,
          completedAt: isCompleting ? Date.now() : undefined
        };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="relative min-h-screen text-[#e2e8f0] pb-10">
      <StarBackground />
      
      {/* HUD Header */}
      <header className="sticky top-0 z-40 bg-[#000a1f]/90 border-b-4 border-blue-800 backdrop-blur-md p-4 md:p-6 mb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-cyan-400 drop-shadow-[0_4px_0_rgba(0,10,31,1)]">
              STAR-TASK
            </h1>
            <p className="text-[10px] text-blue-400 mt-2 tracking-widest">
              GALACTIC COMMAND CENTER v4.0 // BLUE SECTOR
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('ACTIVE')}
              className={`px-3 py-2 text-[10px] pixel-border ${view === 'ACTIVE' ? 'bg-blue-700 text-white' : 'bg-slate-900 text-slate-500'}`}
            >
              ACTIVE [{activeTasks.length}]
            </button>
            <button 
              onClick={() => setView('ARCHIVE')}
              className={`px-3 py-2 text-[10px] pixel-border ${view === 'ARCHIVE' ? 'bg-blue-700 text-white' : 'bg-slate-900 text-slate-500'}`}
            >
              ARCHIVE [{completedTasks.length}]
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="pixel-button bg-cyan-700 hover:bg-cyan-600 !p-2 md:!px-4"
            >
              + MISSION
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 relative z-10">
        {view === 'ACTIVE' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-blue-900/50 pb-2">
              <h2 className="text-sm text-cyan-300">LIVE OPERATIONS</h2>
              <span className="text-[10px] text-blue-500 uppercase tracking-tighter animate-pulse">Scanning...</span>
            </div>
            
            {activeTasks.length === 0 ? (
              <div className="pixel-card text-center py-20 bg-slate-900/20 border-blue-900/50">
                <p className="text-blue-700 text-sm mb-4">SECTOR CLEAR. NO THREATS DETECTED.</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="text-[10px] text-cyan-500 underline underline-offset-4 hover:text-cyan-400"
                >
                  INITIALIZE NEW MISSION?
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeTasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask} 
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-blue-900/50 pb-2">
              <h2 className="text-sm text-blue-400">DATA ARCHIVES</h2>
              <span className="text-[10px] text-slate-600 uppercase tracking-tighter">Read Only</span>
            </div>

            {completedTasks.length === 0 ? (
              <div className="pixel-card text-center py-20 bg-slate-900/20 border-blue-900/50">
                <p className="text-slate-600 text-sm">ARCHIVES ARE EMPTY</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedTasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Navigation Overlay */}
      <footer className="fixed bottom-0 w-full p-4 pointer-events-none z-50">
        <div className="max-w-4xl mx-auto flex justify-end">
           <div className="bg-blue-900/20 backdrop-blur-sm border-2 border-blue-800 p-2 text-[8px] text-cyan-500 pointer-events-auto">
             DEEP SPACE FREQUENCY: 142.0 MHz // LINK: STABLE // SECTOR: BLUE-9
           </div>
        </div>
      </footer>

      {showForm && (
        <TaskForm onAdd={addTask} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default App;
