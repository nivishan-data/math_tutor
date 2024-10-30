# Advanced Mathematics Tutor Application

## Project Overview
This application is an innovative AI-powered mathematics tutoring system that provides detailed, step-by-step explanations for complex mathematical problems. It combines modern web technologies with advanced AI capabilities to create an interactive learning experience.

## Technical Implementation Details

### Backend Architecture (FastAPI)
The backend is built using FastAPI, a modern Python web framework chosen for its:
- High performance and async capabilities
- Automatic API documentation
- Built-in data validation using Pydantic
- Easy integration with AI services

Key components:
1. **API Endpoint (`/api/answer`)**
   - Handles POST requests containing mathematics questions
   - Processes requests through OpenAI's fine-tuned model
   - Returns detailed, structured responses

2. **AI Integration**
   - Utilizes a custom fine-tuned GPT model specifically trained for mathematical explanations
   - Model parameters optimized for:
     - Detailed step-by-step explanations
     - Mathematical accuracy
     - Student-friendly language

3. **Security & Configuration**
   - Environment-based configuration using python-dotenv
   - CORS middleware for secure cross-origin requests
   - API key management for OpenAI integration

### Frontend Architecture (React)
The frontend is implemented in React, featuring:

1. **Component Structure**
   - `App.js`: Main application container
   - `TutorForm.js`: Core interaction component
   
2. **User Interface Features**
   - Clean, intuitive question submission interface
   - Real-time loading states
   - Formatted answer display
   - Error handling with user feedback

3. **State Management**
   - Efficient React hooks implementation
   - Local state management for:
     - User input
     - API responses
     - Loading states

### Docker Implementation
The application is containerized using Docker for consistent deployment:

1. **Frontend Container**
   - Node.js based environment
   - Production-optimized build
   - Nginx server for static file serving

2. **Backend Container**
   - Python environment with FastAPI
   - Uvicorn server configuration
   - Environment variable management

3. **Docker Compose Setup**
   - Orchestrated container deployment
   - Network configuration
   - Volume management

## Setup Instructions

### Prerequisites
```
Node.js >= 14.x
Python >= 3.8
Docker >= 20.x
Docker Compose >= 1.29
```

### Local Development Setup

1. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Configuration**
   Create `.env` files:
   
   Backend `.env`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### Running the Application

#### Development Mode
1. **Backend**
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm start
   ```

#### Production Mode (Docker)
```bash
docker-compose up --build
```

## API Documentation

### POST /api/answer
Request body:
```json
{
  "question": "string"
}
```

Response:
```json
{
  "answer": "string"
}
```

## Project Structure
```
math_tutor/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py          # FastAPI application
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TutorForm.js # Main form component
│   │   └── App.js          # Root component
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Development Guidelines

### Code Style
- Backend: Follow PEP 8 guidelines
- Frontend: ESLint configuration with Airbnb style guide
- Comprehensive documentation for all components
- Type hints in Python code
- PropTypes in React components

### Testing
- Backend: PyTest for unit tests
- Frontend: Jest and React Testing Library
- Integration tests using Postman/Newman

### Version Control
- Feature branch workflow
- Semantic versioning
- Detailed commit messages
- Pull request reviews

## Performance Considerations
- Optimized Docker builds
- Frontend bundle optimization
- Backend response caching
- Rate limiting on API endpoints
- Error boundary implementation in React

## Security Measures
- Environment variable management
- CORS configuration
- API key rotation
- Input validation
- XSS prevention
- CSRF protection

## Monitoring and Logging
- Application logs
- Error tracking
- Performance monitoring
- User analytics
- API usage metrics

This mathematics tutor application demonstrates modern web development practices, combining AI capabilities with a robust technical implementation. The architecture ensures scalability, maintainability, and a smooth user experience.
