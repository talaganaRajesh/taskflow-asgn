import React, { useEffect, useState } from 'react'
import { storeUsername } from '../utils/localStorage'
import { useRef } from 'react'

const Login = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim()) {
      return
    }

    setIsSubmitting(true)

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      storeUsername(username.trim())
      onLogin(username.trim())
      setIsSubmitting(false)
    }, 500)
  }

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

  }, []);

  window.focus(inputRef)

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-gray-50'
      }`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isDarkMode
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className={`w-full max-w-md space-y-8 ${isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
        {/* Logo and Title */}
        <div className="">
          <div className='flex flex-row w-fit gap-2'>
            <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-orange-600' : 'bg-orange-500'
              }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Task<span className='text-orange-500'>Flow</span></h1>
          </div>
          <p className={` text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
            Your one stop task manager
          </p>
        </div>

        {/* Login Form */}
        <div className={`bg-white dark:bg-zinc-900 py-8 px-6 shadow-2xl rounded-2xl border ${isDarkMode ? 'border-gray-800' : 'border-gray-100'
          }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                Username
              </label>
              <input
                ref={inputRef}
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent ${isDarkMode
                  ? 'bg-zinc-800 border-zinc-700 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                placeholder="Enter your username"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim() || isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${!username.trim() || isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <a
            href='https://talaganarajesh.vercel.app/'
            target='blank'
            className={`text-sm font-semibold opacity-60 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
            Built with 💖 by Rajesh .
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login