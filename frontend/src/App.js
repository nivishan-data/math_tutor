import React from 'react';
import TutorForm from './components/TutorForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Advanced Mathematics Tutor</h1>
        <p style={{ 
          maxWidth: '800px', 
          margin: '0 auto 2rem',
          color: 'var(--secondary-color)',
          lineHeight: '1.6'
        }}>
          Get step-by-step solutions to complex mathematics problems. Our AI tutor helps you
          understand mathematical concepts from basic arithmetic to advanced calculus.
        </p>
      </header>

      <main>
        <TutorForm />
        
        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ 
            color: 'var(--secondary-color)',
            marginBottom: '1rem'
          }}>
            Example Questions
          </h2>
          <ul style={{ 
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gap: '1rem',
            textAlign: 'left'
          }}>
            <li>• Solve the quadratic equation: 2x² - 7x + 3 = 0</li>
            <li>• Find the derivative of f(x) = x³ + 2x² - 4x + 1</li>
            <li>• Calculate the area between y = x² and y = 2x - 1</li>
            <li>• Solve the system of equations: 3x + 2y = 12 and x - y = 3</li>
          </ul>
        </div>
      </main>

      <footer style={{
        marginTop: '3rem',
        padding: '2rem',
        borderTop: '1px solid #eee',
        color: 'var(--secondary-color)',
        textAlign: 'center'
      }}>
        <p>Advanced Mathematics Tutor © 2024</p>
      </footer>
    </div>
  );
}

export default App;
