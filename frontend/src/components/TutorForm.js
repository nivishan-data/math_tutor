// src/components/TutorForm.js
import React, { useState } from 'react';
import axios from 'axios';

function TutorForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
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
