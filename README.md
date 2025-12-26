# 🚗 Carpoolin – Ride Sharing Platform

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)](https://www.sonarqube.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Connect. Share. Ride.**  
> A modern carpooling (ride-sharing) platform built for learning purposes.


## 📖 Overview

Carpoolin is a **full-stack carpooling application** connecting drivers and passengers for shared trips.

Users can:
- Publish trips
- Search and filter available rides
- Reserve seats

### Tech Stack
- **Backend:** NestJS
- **Frontend:** Angular
- **Database:** MySQL
- **Mobile App:** Android (via Capacitor)
- **Testing:** Jest
- **Code Quality:** SonarQube
- **CI/CD:** Included with gitlab


## 🗂 Project Structure

carpoolin/
├── backend/ # NestJS backend
├── frontend/ # Angular frontend
├── README.md # Global overview


Each folder contains its own minimal README if needed.


## 📦 Installation Instructions

> ⚠️ **Important:** There is no public website or APK.  
> This project must be run locally.

### 1️⃣ Backend (NestJS)


cd backend
npm install
npm run start:dev

Backend runs at: http://localhost:3000

### 2️⃣ Frontend (Angular)

cd frontend
npm install
ng serve

Frontend runs at: http://localhost:4200
🗄 Database Setup

    Create a MySQL database manually

    Execute entity files or run migrations to create tables (TypeORM)

### 🔐 Environment Variables

Copy and configure environment variables:

cd backend
cp .env.example .env

JWT Configuration

    JWT_ACCESS_SECRET: Secret key for access tokens

    JWT_REFRESH_SECRET: Secret key for refresh tokens

    JWT_ACCESS_EXPIRATION: e.g., 15m

    JWT_REFRESH_EXPIRATION: e.g., 7d

## 📱 Mobile Application (Capacitor)

This project includes an experimental Android mobile application built using **Capacitor**.

Current status:
- Mobile build is for learning and testing purposes only
- Some features may be incomplete or unstable
- Requires a running backend API

Basic commands:

cd frontend
npm run build
npx cap sync
npx cap open android

⚠️ The mobile app is not production-ready.

### 2️⃣ Ngrok / API Exposure (if you use it)

## 🌐 API Exposure (Ngrok)

For mobile testing, the backend API may need to be accessible from a physical device.

Ngrok can be used to expose the local backend:

ngrok http 3000


### 3️⃣ CI/CD clarification (small but professional)

Since you use GitLab CI:

## 🔁 CI/CD

This project includes a **GitLab CI/CD pipeline** for:
- Build
- Testing
- Code quality analysis (SonarQube)

⚠️ CI/CD secrets (tokens, passwords) are not included in the repository and must be configured using GitLab CI/CD variables.

### 📚 Documentation (Compodoc)

Generate NestJs documentation
cd backend
npm npx compodoc -p tsconfig.json -s

Generate Angular documentation:

cd frontend
npx compodoc -p tsconfig.json -s

Open in browser: http://localhost:8080

📖 Compodoc Guide : https://compodoc.app/guides/getting-started.html


### ⚠️ Known Issues

    Learning Project Notice
    This project is developed for educational purposes and is not fully optimized.

    Database setup requires manual configuration or migrations

    Limited backend error handling

    Frontend UI not fully responsive

    Performance optimizations pending

    Documentation may be incomplete

## 🎯 Learning Goals

This project was built to practice:
- Full-stack architecture (NestJS + Angular)
- Authentication with JWT
- REST API design
- CI/CD pipelines
- Code quality tools (SonarQube)
- Mobile integration using Capacitor




