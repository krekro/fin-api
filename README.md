# Expense Tracker API

A RESTful API for tracking expenses and transactions, built with Node.js, Express, and PostgreSQL.

## Features

- Track expenses by category
- View transaction history
- Group expenses by user
- RESTful API endpoints
- Secure database connections
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd expense-tracker-api-v1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

4. Set up your PostgreSQL database:
```sql
CREATE DATABASE your_db_name;
```

## Project Structure

```
expense-tracker-api-v1/
├── src/
│   ├── config/         # Configuration files
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── services/       # Business logic
├── .env                # Environment variables
├── .env.example        # Example environment variables
├── .gitignore          # Git ignore file
├── app.js              # Application entry point
└── package.json        # Project dependencies
```

## API Endpoints

### Get Expenses by Category
```
GET /api/expenses
```
Returns expenses grouped by category and user.

### Get All Transactions
```
GET /api/transactions
```
Returns all transactions ordered by date.

### Server Status
```
GET /status
```
Returns server status information.

## Development

1. Start the development server:
```bash
npm run dev
```

2. Run tests:
```bash
npm test
```

3. Lint code:
```bash
npm run lint
```

## Production

To run in production mode:
```bash
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 4000 |
| NODE_ENV | Environment (development/production) | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USER | Database user | - |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | - |
| CORS_ORIGIN | Allowed CORS origin | * |
| LOG_LEVEL | Logging level | info |

## Error Handling

The API includes centralized error handling with appropriate HTTP status codes and error messages.

## Security

- Environment variables for sensitive data
- CORS configuration
- Input validation
- Secure database connections

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