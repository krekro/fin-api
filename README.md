# Expense Tracker API

A RESTful API for managing personal expenses and transactions, built with Node.js and Express.

## Features

- User authentication and session management
- Track expenses by category
- View monthly expense summaries
- Manage transactions with descriptions
- Secure session-based authentication

## Prerequisites

- Node.js (>=14.0.0)
- PostgreSQL database
- Supabase account (for user authentication)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd expense-tracker-api-v1
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_SSLMODE=your_ssl_mode
SUPA_HOST=your_supabase_host
NODE_ENV=development
```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reloading
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication

#### Login
- **POST** `/user/login`
- Request body:
```json
{
    "user_name": "username",
    "password": "password"
}
```
- Response:
```json
{
    "status": "success",
    "message": "Login successful",
    "uid": "user_id",
    "username": "username",
    "session_id": "session_token"
}
```

### Expenses

#### Get Monthly Expenses
- **GET** `/api/expenses?user_name=username&session_id=session_token`
- Response:
```json
{
    "status": "success",
    "data": [
        {
            "user": "username",
            "category": "category_name",
            "amount": 100.00,
            "color": ""
        }
    ]
}
```

#### Get Transactions
- **GET** `/api/transactions?user_name=username&session_id=session_token`
- Response:
```json
{
    "status": "success",
    "data": [
        {
            "payment_id": "uuid",
            "user_name": "username",
            "category": "category_name",
            "amount": 100.00,
            "color": "",
            "description": "transaction description",
            "date": "YYYY-MM-DD"
        }
    ]
}
```

#### Create Transaction
- **POST** `/api/create-transaction`
- Request body:
```json
{
    "session_id": "session_token",
    "user_name": "username",
    "payment_id": "uuid",
    "category": "category_name",
    "amount": 100.00,
    "create_date": "YYYY-MM-DD",
    "transaction_desc": "transaction description"
}
```
- Response:
```json
{
    "status": "success",
    "data": {
        "payment_id": "uuid",
        "user": "username",
        "category": "category_name",
        "amount": 100.00,
        "date": "YYYY-MM-DD",
        "description": "transaction description"
    }
}
```

## Error Handling

The API uses a centralized error handling middleware that returns errors in the following format:

```json
{
    "status": "error",
    "message": "Error message",
    "code": "error_code"
}
```

## Security

- All endpoints (except login) require a valid session token
- Session tokens are validated on each request
- Passwords are stored securely in the database
- CORS is configured for security

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository. 