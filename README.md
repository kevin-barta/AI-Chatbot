# AI Chat Application

A real-time chat application powered by OpenAI's GPT API with user authentication.

## Features

- User authentication (register/login) with JWT
- Real-time chat interface with GPT-3.5 Turbo
- Rate limiting for API protection
- Secure password hashing
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)
- OpenAI API key
- Environment variables properly configured

## Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication

- **Register**: `POST /auth/register`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Login**: `POST /auth/login`
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Chat

- **Send Message**: `POST /chat/message`
  ```json
  {
    "message": "string"
  }
  ```
  *Requires Authorization header with JWT token*