🚗 Carpoolin – Modern Ride-Sharing Platform

https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white
https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white
https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white

    Connect. Share. Ride. – A full-stack carpooling platform for educational purposes

✨ Features

    Trip Management: Publish trips, search rides, and reserve seats

    User Roles: Drivers and passengers with distinct interfaces

    Real-time Search: Filter available rides by date, route, and price

    Mobile Ready: Android app via Capacitor

    Secure Authentication: JWT-based auth with refresh tokens

    Code Quality: Integrated testing and SonarQube analysis

🏗️ Architecture
text

carpoolin/
├── backend/          # NestJS REST API
├── frontend/         # Angular web application
├── android/          # Capacitor mobile app
└── README.md         # You are here

🚀 Quick Start
Prerequisites

    Node.js 18+ & npm

    MySQL 8+

    Git

1. Clone & Setup
bash

git clone https://github.com/yourusername/carpoolin.git
cd carpoolin

2. Database Setup
sql

CREATE DATABASE carpoolin;
-- Import schema from backend/schema.sql or run migrations

3. Backend Setup
bash

cd backend
cp .env.example .env  # Configure your environment variables
npm install
npm run start:dev     # http://localhost:3000

4. Frontend Setup
bash

cd ../frontend
npm install
ng serve              # http://localhost:4200

5. Mobile App (Optional)
bash

cd ../frontend
npx cap add android
npx cap run android

⚙️ Environment Configuration
Backend (.env)
env

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=carpoolin

# JWT Authentication
JWT_ACCESS_SECRET=your-access-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# App
PORT=3000
NODE_ENV=development

Security Note

⚠️ Never commit actual .env files to version control. Use .env.example as a template.
📚 API Documentation
Generate API Docs
bash

cd backend
npm run doc           # Swagger UI at http://localhost:3000/api

Generate Frontend Documentation
bash

cd frontend
npx compodoc -p tsconfig.json -s
# Open http://localhost:8080

🧪 Testing
Backend Tests
bash

cd backend
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Test coverage

Frontend Tests
bash

cd frontend
npm test              # Karma unit tests
npm run e2e           # Protractor E2E tests

Code Quality
bash

# Linting
cd backend && npm run lint
cd frontend && npm run lint

# SonarQube analysis
sonar-scanner

👥 User Roles & Workflows
🚗 Driver

    Register/Login

    Create trip with details (route, date, seats, price)

    Manage bookings

    Start/complete trips

👤 Passenger

    Register/Login

    Search available trips

    Filter by date, price, location

    Book seats

    View booking history

🤝 Contributing

We welcome contributions! Please follow these guidelines:
Branch Strategy

    main → Production-ready code

    develop → Integration branch

    feature/* → New features

    bugfix/* → Bug fixes

    hotfix/* → Critical production fixes

Commit Convention
text

feat: add trip search functionality
fix: resolve booking validation issue
docs: update installation instructions
style: format code with prettier
refactor: improve authentication service
test: add unit tests for user module
chore: update dependencies

Pull Request Process

    Fork the repository

    Create a feature branch

    Commit changes following conventions

    Add/update tests

    Update documentation if needed

    Submit PR with clear description

    Ensure CI passes

🐛 Known Limitations

    Educational Project Notice: This is a learning project with certain limitations:

    Database requires manual setup/migrations

    Basic error handling implementation

    Limited UI responsiveness on mobile web

    Performance optimizations pending

    Documentation may be incomplete

    No production deployment pipeline

Please report issues and suggestions via GitHub Issues.
🔧 Troubleshooting
Issue	Solution
Database connection fails	Verify MySQL is running and credentials in .env
JWT errors	Ensure JWT secrets are set and match
CORS errors	Check backend CORS configuration
Build failures	Clear node_modules and reinstall: rm -rf node_modules && npm install
Capacitor issues	Run npx cap sync after npm install
📊 Project Status
Component	Status	Coverage
Backend	✅ Stable	85%
Frontend	✅ Functional	75%
Mobile App	🔧 In Progress	40%
Documentation	📝 Ongoing	60%
Tests	🧪 Comprehensive	80%
📄 License

MIT License © 2024 Carpoolin Contributors

See LICENSE for details.
🔗 Useful Links

    NestJS Documentation

    Angular Documentation

    MySQL Documentation

    Capacitor Documentation

    TypeORM Guide

Happy Coding! 🚗💨

For questions or support, please open an issue in the repository.
