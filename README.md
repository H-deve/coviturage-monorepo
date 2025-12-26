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


## 🏗️ Modern Architecture
```text
carpoolin/
├── backend/            # NestJS REST API
├── frontend/           # Angular web application
│   └── android/        # Capacitor Android app (experimental)
├── .gitlab-ci.yml      # GitLab CI/CD pipeline
└── README.md           # Global project documentation
```



## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js 16+** & npm 8+
- **MySQL 8+** database server
- **Git** for version control

---

### 1️⃣ Clone the Repository
```bash
https://github.com/H-deve/Ride-Sharing-Platform.git
cd Ride-Sharing-Platform
```
2️⃣ Backend Setup (NestJS)
```bash
cd backend
```
# Install dependencies
npm install

# Edit the .env file with your database credentials
# (See Environment Variables section below)

# Start development server
npm run start:dev

Backend runs at: http://localhost:3000

### 3️⃣ Database Setup
TypeORM Migrations

cd backend
# Generate migration (after creating entities)
npm run migration:generate --name=InitialSchema

# Run migrations
npm run migration:run


### 4️⃣ Frontend Setup (Angular)

cd ../frontend

# Install dependencies
npm install

# Start development server
ng serve

Frontend runs at: http://localhost:4200
### 5️⃣ Mobile App

# From the frontend directory
npm run build           # Build Angular app
npx cap sync           # Sync with Capacitor
npx cap open android   # Open in Android Studio

Note: The mobile app is for learning/testing purposes only.

###⚙️ Environment Configuration
Backend Environment (.env)

Create backend/.env from backend/.env.example

### 📱 Mobile Application (Capacitor)
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

### 🔁 GitLab CI/CD Pipeline

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

### 📚 Documentation
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

### 🧪 Testing
Backend Tests

cd backend
npm test              # Run unit tests
npm run test:e2e      # Run E2E tests
npm run test:cov      # Generate test coverage report

Frontend Tests
cd frontend
npm test              # Run Karma unit tests
npm run e2e           # Run Protractor E2E tests


### 👥 User Workflows
🚗 Driver Experience

    Register/Login as driver

    Create Trip - Set route, date/time, seats, price

    Manage Bookings - Accept/reject passenger requests

    Trip Management - Start, complete, or cancel trips


👤 Passenger Experience

    Register/Login as passenger

    Search Rides - Filter by location, date, price

    Book Seats - Reserve seats on available trips


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



Happy Coding! 🚗💨

Built with passion for learning full-stack development. Connect drivers and passengers, one ride at a time.


