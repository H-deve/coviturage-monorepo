# 🚗 Carpoolin – Modern Ride-Sharing Platform

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)](https://www.sonarqube.org/)
[![GitLab CI/CD](https://img.shields.io/badge/GitLab_CI/CD-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)](https://docs.gitlab.com/ee/ci/)

> **Connect. Share. Ride.** – A full-stack carpooling platform for learning and practice

## ✨ Features

- **Trip Management**: Publish trips, search rides, and reserve seats
- **User Roles**: Drivers and passengers with distinct interfaces
- **Real-time Search**: Filter available rides by date, route, and price
- **Mobile Ready**: Android app via Capacitor (experimental)
- **Secure Authentication**: JWT-based auth with refresh tokens
- **Code Quality**: Integrated testing and SonarQube analysis
- **CI/CD Pipeline**: GitLab CI/CD for automated build and test

## 📖 Overview

Carpoolin is a **full-stack carpooling application** connecting drivers and passengers for shared trips. Built for educational purposes to practice modern web development.

**Users can:**
- 🚗 Publish trips as drivers
- 🔍 Search and filter available rides
- 💺 Reserve seats as passengers
- 📱 Access via web or mobile app

## 🎯 Learning Goals

This project was built to practice:
- Full-stack architecture (NestJS + Angular)
- Authentication with JWT tokens
- REST API design and documentation
- CI/CD pipelines with GitLab
- Code quality tools (SonarQube)
- Mobile integration using Capacitor
- Database design with TypeORM/MySQL

## 🏗️ Architecture

graph TB
    subgraph "🌍 Presentation Layer"
        A[Web Browser<br/>Angular App] --> B[Android Mobile<br/>Capacitor]
        A --> C[iOS Mobile<br/>Capacitor]
    end
    
    subgraph "🚀 Application Layer"
        D[NestJS API Gateway<br/>REST API]
        E[Authentication<br/>JWT Service]
        F[Business Logic<br/>Trip/Booking Services]
    end
    
    subgraph "💾 Data Layer"
        G[MySQL Database]
        H[Redis Cache<br/>Optional]
        I[File Storage<br/>User Images]
    end
    
    subgraph "⚙️ DevOps & Tools"
        J[GitLab CI/CD<br/>Pipeline]
        K[SonarQube<br/>Code Quality]
        L[Docker<br/>Containerization]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    E --> G
    F --> G
    F --> H
    J --> K


## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js 16+** & npm 8+
- **MySQL 8+** database server
- **Git** for version control
- (Optional) **Android Studio** for mobile development

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/carpoolin.git
cd carpoolin

2️⃣ Backend Setup (NestJS)
bash

cd backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit the .env file with your database credentials
# (See Environment Variables section below)

# Start development server
npm run start:dev

Backend runs at: http://localhost:3000
3️⃣ Database Setup
Option A: Manual SQL (Quick Start)
sql

-- Create database
CREATE DATABASE IF NOT EXISTS carpoolin_db;
USE carpoolin_db;

-- Basic tables (simplified)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('driver', 'passenger') DEFAULT 'passenger',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departure_time DATETIME NOT NULL,
    available_seats INT NOT NULL,
    price_per_seat DECIMAL(10,2),
    status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE CASCADE
);

Option B: TypeORM Migrations
bash

cd backend

# Generate migration (after creating entities)
npm run migration:generate --name=InitialSchema

# Run migrations
npm run migration:run

# Revert if needed
npm run migration:revert

4️⃣ Frontend Setup (Angular)
bash

cd ../frontend

# Install dependencies
npm install

# Start development server
ng serve

Frontend runs at: http://localhost:4200
5️⃣ Mobile App (Optional - Experimental)
bash

# From the frontend directory
npm run build           # Build Angular app
npx cap sync           # Sync with Capacitor
npx cap open android   # Open in Android Studio

Note: The mobile app is for learning/testing purposes only.
⚙️ Environment Configuration
Backend Environment (.env)

Create backend/.env from backend/.env.example:
env

# =====================
# Database Configuration
# =====================
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=carpoolin_db

# =====================
# JWT Configuration
# =====================
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# =====================
# Application Configuration
# =====================
NODE_ENV=development
PORT=3000

🔒 Security Notes

    Never commit .env files to version control

    Use strong, random strings for JWT secrets

    Generate secrets: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

    Keep different credentials for development/production

📱 Mobile Application (Capacitor)
Current Status

    ✅ Mobile build works for learning and testing

    ⚠️ Some features may be incomplete or unstable

    🔧 Requires a running backend API

    📱 Not production-ready (educational purpose only)

Mobile Testing Workflow

    Start backend: npm run start:dev

    Expose API for physical device testing:
    bash

# Install ngrok
npm install -g ngrok

# Expose backend
ngrok http 3000

Update frontend API URL in environment files

Build and run mobile app:
bash

cd frontend
npm run build
npx cap sync
npx cap run android

🔁 GitLab CI/CD Pipeline

This project includes a GitLab CI/CD pipeline configured in .gitlab-ci.yml:
Pipeline Stages

    Build - Install dependencies for backend and frontend

    Test - Run unit and integration tests with Jest

    Quality - SonarQube code analysis

    Deploy - (Optional) Deployment to staging/production

CI/CD Configuration

Secrets (tokens, passwords) are not included in the repository. Configure them as GitLab CI/CD variables:

    SONAR_TOKEN - SonarQube authentication token

    DB_TEST_* - Test database credentials

    Deployment tokens (if deploying)

📚 Documentation
Generate API Documentation (NestJS)
bash

cd backend
npm run compodoc
# Open: http://localhost:8080

Generate Frontend Documentation (Angular)
bash

cd frontend
npx compodoc -p tsconfig.json -s
# Open: http://localhost:8080

Compodoc Guide

For detailed documentation generation: https://compodoc.app/guides/getting-started.html
🧪 Testing
Backend Tests
bash

cd backend
npm test              # Run unit tests
npm run test:e2e      # Run E2E tests
npm run test:cov      # Generate test coverage report

Frontend Tests
bash

cd frontend
npm test              # Run Karma unit tests
npm run e2e           # Run Protractor E2E tests

Code Quality Checks
bash

# Backend linting
cd backend && npm run lint

# Frontend linting  
cd frontend && npm run lint

# SonarQube analysis (requires setup)
sonar-scanner

👥 User Workflows
🚗 Driver Experience

    Register/Login as driver

    Create Trip - Set route, date/time, seats, price

    Manage Bookings - Accept/reject passenger requests

    Trip Management - Start, complete, or cancel trips

    Earnings - View trip history and earnings

👤 Passenger Experience

    Register/Login as passenger

    Search Rides - Filter by location, date, price

    Book Seats - Reserve seats on available trips

    Trip Status - Track upcoming and past rides

    Payments - Simulated payment processing

    Ratings - Rate drivers after completed trips

🤝 Contributing
Branch Strategy

    main → Production-ready code

    develop → Integration branch for features

    feature/* → New feature development

    bugfix/* → Bug fixes

    hotfix/* → Critical production fixes

Commit Convention
bash

feat: add trip search with filters
fix: resolve booking validation error
docs: update installation instructions
style: format code with prettier
refactor: improve authentication service
test: add unit tests for user module  
chore: update dependencies

Pull Request Process

    Fork the repository

    Create a feature/bugfix branch

    Commit changes following conventions

    Add/update relevant tests

    Update documentation if needed

    Submit PR with clear description

    Ensure all CI checks pass

🐛 Known Issues & Limitations

    ⚠️ Educational Project Notice: This is primarily a learning project with certain limitations.

Current Limitations

    Database setup requires manual SQL or migrations

    Limited error handling in some backend endpoints

    Frontend UI not fully responsive on all devices

    Performance optimizations pending implementation

    Documentation may be incomplete in some areas

    Mobile app is experimental and not production-ready

    Testing coverage needs improvement in some modules

Areas for Future Improvement

    Add real-time notifications with WebSockets

    Implement payment gateway integration

    Add Docker support for easier deployment

    Enhance security with rate limiting, input validation

    Improve test coverage to >90%

    Add admin dashboard for user/trip management

Please open an issue if you encounter bugs or have suggestions for improvements.
🔧 Troubleshooting Guide
Issue	Solution
Database connection fails	Verify MySQL service is running and .env credentials are correct
JWT authentication errors	Ensure JWT secrets are set in .env and match
CORS errors	Check backend CORS configuration in main.ts
Angular build fails	Clear node_modules: rm -rf node_modules && npm install
Capacitor sync issues	Run npx cap sync after npm install
Ngrok connection refused	Ensure backend is running on port 3000
Mobile app connection errors	Update API URL in environment files to ngrok URL
TypeORM migration errors	Check database permissions and connection
Common Commands for Issues
bash

# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reset database (development only)
npm run schema:drop && npm run schema:sync

# Check environment variables
echo $DB_HOST
echo $DB_USERNAME

📊 Project Status
Component	Status	Coverage	Notes
Backend API	✅ Stable	~85%	Core CRUD operations complete
Frontend Web	✅ Functional	~75%	Basic UI with essential features
Mobile App	🔧 Experimental	~40%	Learning/testing only
Database	✅ Configured	N/A	MySQL with TypeORM
Authentication	✅ Implemented	~90%	JWT with refresh tokens
Documentation	📝 Ongoing	~60%	API docs via Compodoc
Testing Suite	🧪 Comprehensive	~80%	Jest for backend, Karma for frontend
CI/CD Pipeline	✅ Configured	~90%	GitLab CI with SonarQube
📄 License

MIT License © 2024 Carpoolin Contributors

See LICENSE file for complete details.

Permissions: This software may be used, modified, and distributed for educational and personal projects. Commercial use requires permission.
🔗 Useful Resources

    NestJS Documentation

    Angular Documentation

    MySQL Documentation

    Capacitor Documentation

    TypeORM Guide

    GitLab CI/CD Docs

    SonarQube Documentation

    JWT Best Practices

🆘 Getting Help
Support Channels

    Check Known Issues section above

    Review Documentation generated with Compodoc

    Open a GitHub Issue for bugs or feature requests

    Check CI/CD Pipeline logs for build/test failures

    Review error logs in backend/frontend consoles

Before Asking for Help

    Verify all prerequisites are installed

    Check that .env file is properly configured

    Ensure database is running and accessible

    Review console errors in browser/terminal

    Try the troubleshooting steps above

Note: This is an educational project maintained by learners. Response times may vary.
🎬 Demo Access
Local Demo

    Start backend: npm run start:dev

    Start frontend: ng serve

    Open browser: http://localhost:4200

Test Credentials (Development)
text

Driver: driver@example.com / password123
Passenger: passenger@example.com / password123

Architecture Diagram

https://docs/architecture.png
(Add your architecture diagram image here)

Happy Coding! 🚗💨

Built with passion for learning full-stack development. Connect drivers and passengers, one ride at a time.
text


This is a complete, professional README file ready to use. It includes:

1. **All your original content** from both versions
2. **Proper database configuration** for your TypeORM setup
3. **Clear environment variables** section with examples
4. **Step-by-step installation** that matches your actual codebase
5. **Mobile app instructions** with ngrok setup
6. **Complete troubleshooting guide**
7. **All badges and formatting** you wanted

Just copy and paste this into your `README.md` file!
