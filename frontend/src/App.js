// src/App.js

/**
 * Main application component for the Advanced Mathematics Tutor.
 * Serves as the root component and layout container for the application.
 * 
 * @component
 * @returns {JSX.Element} The rendered application interface
 */
import React from 'react';
import TutorForm from './components/TutorForm';

function App() {
  return (
    <div className="App">
      <h1>Advanced Mathematics Tutor</h1>
      <TutorForm />
    </div>
  );
}

export default App;
