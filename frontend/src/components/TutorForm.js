import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TutorForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 500;

  useEffect(() => {
    setCharCount(question.length);
  }, [question]);

  const handleQuestionChange = (e) => {
    const input = e.target.value;
    if (input.length <= MAX_CHARS) {
      setQuestion(input);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setAnswer('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/answer', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setError(
        error.response?.data?.detail ||
        'An error occurred while fetching the answer. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setAnswer('');
    setError('');
  };

  return (
    <div>
      <div className="tutor-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              value={question}
              onChange={handleQuestionChange}
              placeholder="Enter your mathematics question here... (e.g., 'Solve the quadratic equation x² + 5x + 6 = 0')"
              rows="5"
              disabled={loading}
            />
            <div style={{ 
              textAlign: 'right', 
              fontSize: '0.8rem', 
              color: charCount >= MAX_CHARS ? 'var(--error-color)' : 'gray' 
            }}>
              {charCount}/{MAX_CHARS} characters
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button type="submit" disabled={loading || !question.trim()}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Generating Answer...
                </>
              ) : (
                'Get Answer'
              )}
            </button>
            {question && !loading && (
              <button 
                type="button" 
                onClick={handleClear}
                style={{ 
                  backgroundColor: 'var(--secondary-color)',
                  maxWidth: '150px'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      {answer && (
        <div className="answer-section">
          <h2>Solution:</h2>
          <div className="answer-content">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorForm;
