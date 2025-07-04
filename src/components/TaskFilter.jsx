import React from 'react'

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts, isDarkMode }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
            currentFilter === filter.key
              ? 'bg-zinc-600 text-white shadow-lg'
              : isDarkMode
                ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                : 'bg-gray-100 text-gray-700 hover:bg-zinc-200'
          }`}
        >
          {filter.label}
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            currentFilter === filter.key
              ? 'bg-orange-400 text-white'
              : isDarkMode
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gray-200 text-gray-600'
          }`}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  )
}

export default TaskFilter