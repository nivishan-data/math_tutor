// src/components/TutorForm.js

/**
 * Component that handles user input and displays mathematical explanations.
 * Provides an interface for users to submit mathematics questions and receive detailed answers.
 * 
 * @component
 * @returns {JSX.Element} A form interface for question submission and answer display
 */
import React, { useState } from 'react';
import axios from 'axios';

function TutorForm() {
  // State management for form inputs and API response
  const [question, setQuestion] = useState('');  // Stores the user's question
  const [answer, setAnswer] = useState('');      // Stores the API response
  const [loading, setLoading] = useState(false); // Tracks API request status

  /**
   * Handles form submission and API interaction.
   * Sends the user's question to the backend and manages the response.
   * 
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
      // Send question to backend API
      const response = await axios.post('http://localhost:8000/api/answer', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setAnswer('An error occurred while fetching the answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your complex mathematics question here..."
          rows="5"
          cols="60"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Answer...' : 'Get Answer'}
        </button>
      </form>
      {answer && (
        <div>
          <h2>Answer:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{answer}</pre>
        </div>
      )}
    </div>
  );
}

export default TutorForm;
