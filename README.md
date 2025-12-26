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

---

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
- **CI/CD:** Included

---

## 🗂 Project Structure

carpoolin/

├── backend/ # NestJS backend
├── frontend/ # Angular frontend
├── README.md # Global overview


Each folder contains its own minimal README if needed.

---

## 📦 Installation Instructions

> ⚠️ **Important:** There is no public website or APK.  
> This project must be run locally.

### 1️⃣ Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev

Backend runs at: http://localhost:3000
2️⃣ Frontend (Angular)

cd frontend
npm install
ng serve

Frontend runs at: http://localhost:4200
🗄 Database Setup

    Create a MySQL database manually

    Update credentials in .env

    Execute entity files or run migrations to create tables (TypeORM)

🔐 Environment Variables

Copy and configure environment variables:

cd backend
cp .env.example .env

JWT Configuration

    JWT_ACCESS_SECRET: Secret key for access tokens

    JWT_REFRESH_SECRET: Secret key for refresh tokens

    JWT_ACCESS_EXPIRATION: e.g., 15m

    JWT_REFRESH_EXPIRATION: e.g., 7d

⚠️ Never commit .env to GitHub.
📚 Documentation (Compodoc)

Generate frontend documentation:

cd frontend
npx compodoc -p tsconfig.json -s

Open in browser: http://localhost:8080
📖 Compodoc Guide
🤝 Contributor Expectations

    Use clear commit messages

    Follow project structure and coding standards

    Write readable, documented code

    Add/update unit tests

    Run linting and formatting before committing

    Respect others and maintain professionalism

Pull Request Guidelines

    Create a branch per feature/bug fix

    Describe the purpose of the PR

    Reference related issues

    Ensure your code does not break existing functionality

⚠️ Known Issues

    Learning Project Notice
    This project is developed for educational purposes and is not fully optimized.

    Database setup requires manual configuration or migrations

    Limited backend error handling

    Frontend UI not fully responsive

    Performance optimizations pending

    Documentation may be incomplete

Please open an issue if you encounter a bug or have suggestions.
🎬 Demo / Diagram (Optional)

Demo video: https://youtube.com/your-video-link

Architecture diagram: (Insert image here)
📄 License

This project is licensed under the MIT License.


---

This **single-page README** includes everything your repo needs:

- Project overview & tech stack  
- Installation instructions for backend & frontend  
- Database setup  
- Environment variables & JWT explanation  
- Documentation (Compodoc)  
- Contributor guidelines  
- Known issues (learning disclaimer)  
- Optional demo & architecture section  
- License  

---

If you want, I can also **generate `.env.example` and include instructions directly at the top**, so users can run the project immediately after cloning.  

Do you want me to do that next?
