import React, { useState } from 'react'

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete, isDarkMode }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    onDelete(task.id)
    setShowDeleteConfirm(false)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
      isDarkMode 
        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    } `}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : isDarkMode
                ? 'border-gray-600 hover:border-green-500'
                : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 ml-0.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Task Content */}
        <div className={`flex-1 min-w-0 ${task.completed ? 'opacity-50' : ''} `}>
          <h3 className={`text-lg font-semibold mb-1 ${
            task.completed 
              ? isDarkMode 
                ? 'text-gray-500 line-through' 
                : 'text-gray-500 line-through'
              : isDarkMode 
                ? 'text-white' 
                : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm mb-3 ${
              task.completed 
                ? isDarkMode 
                  ? 'text-gray-600 line-through' 
                  : 'text-gray-400 line-through'
                : isDarkMode 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className={`text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Created: {formatDate(task.createdAt)}
            </span>

            {task.completed && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Completed
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' 
                : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
            }`}
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <button
            onClick={handleDeleteClick}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800' 
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
            }`}
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className={`w-full max-w-sm rounded-2xl border p-6 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-zinc-900 border-zinc-800' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-red-900' : 'bg-red-100'
              }`}>
                <svg className={`w-6 h-6 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.134 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Delete Task
              </h3>
              <p className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-zinc-800 text-zinc-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem