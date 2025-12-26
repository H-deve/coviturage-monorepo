# 🚗 Carpoolin – Ride Sharing Platform

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)  
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)  
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)  
[![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)  
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)  
[![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)](https://www.sonarqube.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Connect. Share. Ride.**  
> A modern carpooling platform to publish, search, and reserve shared trips.

---

## 📖 Intro

Carpoolin is a full-stack carpooling application that connects drivers and passengers for shared trips.  
Users can publish trips, search and filter available rides, and reserve seats easily.

- **Backend:** NestJS  
- **Frontend:** Angular  
- **Database:** MySQL  
- **Mobile App:** Android (via Capacitor)  
- **Testing:** Jest  
- **Code Quality:** SonarQube  
- **CI/CD:** Included  

---

## 🎬 Demo / Diagram (Optional)

🎥 Demo video:  
[https://youtube.com/your-video-link](https://youtube.com/your-video-link)

Architecture overview:

*(Insert architecture diagram/image here)*

---

## 📦 Installation Instructions for Developers

> **Important:** There’s no public website or APK. You must run the project locally.

### 1️⃣ Backend Setup

cd backend           # Go to the backend folder (NestJS project)
npm install          # Install dependencies
npm run start:dev    # Start the development server
cd frontend          # Go to the frontend folder
npm install          # Install dependencies
ng serve             # Or use `npm run start` to start the frontend server

### 3️⃣ Database Setup
create you database
Each company has an entity file defining the structure of its tables.

You need to execute these entity files to create the database tables.

If using TypeORM (with NestJS), you can run migrations or enable automatic synchronization.

### 4️⃣ Documentation with Compodoc
npx compodoc -p tsconfig.json -s
This generates the frontend documentation and serves it locally.

Open your browser at http://localhost:8080

📖 Compodoc Usage Guide : https://compodoc.app/guides/getting-started.html

## 🤝 Contributor Expectations

We welcome contributions from the community! To ensure a smooth collaboration, please follow these guidelines:

- Use **clear and descriptive commit messages**
- Follow the existing **project structure and coding standards**
- Write **clean, readable, and well-documented code**
- Add or update **unit tests** when introducing new features or bug fixes
- Ensure all tests pass before submitting a pull request
- Run **linting and formatting tools** before committing
- Respect other contributors and maintain a professional tone in discussions


### Pull Request Guidelines
- Create a new branch for each feature or bug fix
- Clearly describe the purpose of your pull request
- Reference related issues if applicable
- Make sure your code does not break existing functionality

## ⚠️ Known Issues

> ⚠️ **Learning Project Notice**  
> This project is developed for learning and educational purposes.  
> It is not fully optimized and should not be considered production-ready.

The following issues are currently known and may be addressed in future updates:

- Database setup requires manual configuration of entity execution or migrations
- Limited error handling in some backend API endpoints
- Frontend UI is not fully optimized for all screen sizes
- Performance optimizations have not been fully implemented
- Documentation may be incomplete for some components

If you encounter a bug or have a suggestion, please **open an issue** in the repository with detailed information and steps to reproduce the problem.

