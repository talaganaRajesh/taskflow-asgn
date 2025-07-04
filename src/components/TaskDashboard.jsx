import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { getTasks, storeTasks } from '../utils/localStorage';

const TaskDashboard = ({ username, onLogout, isDarkMode, toggleDarkMode }) => {
  // Initialize tasks state with data from localStorage
  const [tasks, setTasks] = useState(() => getTasks());
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    storeTasks(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'completed' && task.completed) ||
      (currentFilter === 'pending' && !task.completed);

    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-gray-50'
        }`}
    >
      {/* Header */}
      <header
        className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-orange-600' : 'bg-orange-500'
                  }`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <h1 className="text-3xl font-bold tracking-tight">
                  Task<span className="text-orange-500">Flow</span>
                </h1>
                <p className="text-sm">Welcome back, {username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDarkMode
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                    : 'bg-zinc-100 text-gray-800 hover:bg-gray-200'
                  }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${isDarkMode
                    ? 'border-orange-500/40 text-white hover:border-red-500'
                    : 'border-red-500/40 text-black hover:bg-red-100'
                  }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div
              className={`p-6 rounded-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
              >
                Quick Actions
              </h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-200 active:scale-95"
              >
                + Add New Task
              </button>
            </div>

            {/* Task Statistics */}
            <div
              className={`px-6 pt-6 pb-3 rounded-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
              >
                Statistics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                  >
                    Total Tasks
                  </span>
                  <span
                    className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                  >
                    {taskCounts.all}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                  >
                    Completed
                  </span>
                  <span className="font-bold text-green-500">
                    {taskCounts.completed}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                  >
                    Pending
                  </span>
                  <span className="font-bold text-orange-500">
                    {taskCounts.pending}
                  </span>
                </div>
              </div>
              <div>
                <h1 className='font-medium text-center pt-8 text-zinc-400/60 text-xs'>Built by Rajesh for RYGNeco</h1>
              </div>
            </div>


          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Search and Filter */}
            <div
              className={`p-6 rounded-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <svg
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tasks..."
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-transparent ${isDarkMode
                          ? 'bg-zinc-800 border-zinc-700 text-white placeholder-gray-400'
                          : 'bg-zinc-50 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                    />
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <TaskFilter
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
                taskCounts={taskCounts}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleTaskCompletion}
              onEditTask={setEditingTask}
              onDeleteTask={deleteTask}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </main>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSave={editingTask ? updateTask : addTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default TaskDashboard;