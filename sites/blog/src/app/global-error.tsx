'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html>
      <body className="bg-background text-foreground font-cyber">
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
          {/* Cyber Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary"></div>
          
          {/* Cyber Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(143, 143, 143, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(143, 143, 143, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="max-w-md w-full text-center relative z-10">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-cyber-800/30 border border-cyber-600 rounded-full flex items-center justify-center cyber-glow">
                <svg className="w-10 h-10 text-cyber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-400 to-transparent mx-auto cyber-glow"></div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-cyber-100 mb-4">
                CRITICAL FAILURE
              </h2>
              <p className="text-cyber-300 text-base leading-relaxed font-cyber mb-4">
                A critical system failure has occurred that prevented application initialization.
                <br />
                <span className="text-cyber-400 text-sm">Emergency protocols activated...</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-black border border-cyber-400 hover:border-cyber-300 hover:bg-cyber-900/20 text-cyber-100 font-medium rounded-lg transition-all duration-300 cyber-glow hover:shadow-cyber-lg transform hover:scale-105 font-cyber"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  RETRY INITIALIZATION
                </span>
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 bg-transparent border border-cyber-600 hover:border-cyber-400 hover:bg-cyber-800/10 text-cyber-200 font-medium rounded-lg transition-all duration-300 hover:shadow-cyber transform hover:scale-105 font-cyber"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  FORCE RELOAD
                </span>
              </button>
            </div>

            {/* Additional Help */}
            <div className="pt-6 border-t border-cyber-800">
              <p className="text-cyber-500 text-xs font-cyber">
                If this problem persists,{' '}
                <a 
                  href="mailto:santhoshsunthar@gmail.com" 
                  className="text-cyber-300 hover:text-cyber-100 transition-colors duration-300 underline decoration-cyber-400 hover:decoration-cyber-200"
                >
                  contact
                </a>
              </p>
            </div>

            {/* Cyber Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyber-400 opacity-30"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-cyber-400 opacity-30"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-cyber-400 opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-cyber-400 opacity-30"></div>
          </div>
        </div>
      </body>
    </html>
  )
}
