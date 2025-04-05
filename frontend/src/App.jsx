import React from 'react';  
import AppRouter from './routes/AppRouter';

function App() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
          <AppRouter />
        </div>
      );
}

export default App;
