# Carpoolin - Ride Sharing Platform 🚗

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)](https://www.sonarqube.org/)

> A modern carpooling platform connecting drivers and passengers for shared journeys.

## 📋 Table of Contents
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [Testing](#-testing)
- [Mobile Build](#-mobile-build)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👤 User Features
- **🔐 Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (Driver/Passenger)
  - Email verification
  - Password reset

- **🚗 Ride Management**
  - 📅 Publish trips with departure/arrival details
  - 🔍 Search & filter available trips
  - ✅ Book/reserve seats

### 🚀 Admin Features
- 👥 User management dashboard
- ⚠️ Report management system
- 🔧 Platform configuration

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Angular Web App] --> B[Capacitor]
        B --> C[Android APK]
    end
    
    subgraph "Backend Layer"
        D[NestJS API] --> E[NGINX Reverse Proxy]
        D --> F[MySQL Database]
    end
    
    subgraph "DevOps"
        G[GitHub Actions CI/CD]
        H[SonarQube Quality Gate]
        I[Jest Test Coverage]
    end
    
    E --> A
    G --> H
    G --> I
