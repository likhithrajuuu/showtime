# 🎬 Showtime Platform — Full Setup Guide

A complete guide to run **Showtime Backend (Spring Boot)** and **Showtime Frontend (React.js)** on your machine. This README is structured with clear tables, commands, diagrams, and environment setup instructions.

---

## 📥 0. Download the Project

Before starting, download or clone both repositories:

### **Using Git (Recommended):**

```
git clone https://github.com/likhithrajuuu/showtime-backend.git
git clone https://github.com/likhithrajuuu/showtime-frontend.git
```

### **Or Download ZIP Files:**

* Download **showtime-backend.zip** and extract
* Download **showtime-frontend.zip** and extract

Once downloaded, proceed below 👇

## 📁 Project Structure

```
showtime/
│
├── showtime-backend/      # Spring Boot + PostgreSQL + Redis
│   └── resources/
│        └── setup.sql     # DB schema & sample data
└── showtime-frontend/     # React + Redux + Tailwind CSS
```

---

# 🚀 1. Backend Setup — Spring Boot

## 📦 Tech Stack

| Component  | Technology      |
| ---------- | --------------- |
| Language   | Java 21         |
| Framework  | Spring Boot 3.x |
| Database   | PostgreSQL      |
| Cache      | Redis           |
| Build Tool | Maven           |

---

## 🛠️ Backend Requirements

| Requirement | Version       |
| ----------- | ------------- |
| Java        | 21 or later   |
| Maven       | 3.9+          |
| PostgreSQL  | 14+           |
| Redis       | Latest stable |

---

## ⚙️ Environment Variables

Create a `.env` file or configure in `application.properties`:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/showtime
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=yourpassword
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_CACHE_TYPE=redis
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379
```

---

## 🗄️ Database Setup

1. **Create the database:**
    ```sql
    CREATE DATABASE showtime;
    ```

2. **Run all schema and sample data from [resources/setup.sql](showtime-backend/resources/setup.sql)**  
   This file contains table definitions, sample data insertion, and other required commands.

   **Mac/Linux:**
   ```
   psql -U postgres -d showtime -f showtime-backend/resources/setup.sql
   ```

   **Windows (using Command Prompt or PowerShell, assuming `psql.exe` is in PATH):**
   ```
   psql -U postgres -d showtime -f showtime-backend\resources\setup.sql
   ```
   *(Replace `postgres` with your actual database username if different.)*

3. **Ensure PostgreSQL is running:**

   **Mac/Linux (Homebrew):**
   ```
   brew services start postgresql
   ```

   **Windows:**
   - Use **pgAdmin**, or search for "PostgreSQL" and start the service via the **Services** app.
   - Or, run in Command Prompt:
     ```
     net start postgresql-x64-14
     ```
    *(Service name may vary by your installed version.)*

---

## 🔥 Redis Setup

**Mac/Linux (Homebrew):**
```
brew services start redis
```

**Windows:**
- Start Redis from the installed location:
  ```
  redis-server.exe
  ```
- If Redis is installed as a service, use Command Prompt:
  ```
  net start Redis
  ```

Check if running (both platforms):
```
redis-cli ping
# Output: PONG
```

---

## ▶️ Run Backend

```
cd showtime-backend
mvn spring-boot:run
```

Backend starts at:

```
http://localhost:8080
```

---

# 🎨 2. Frontend Setup — React.js

## 📦 Tech Stack

| Component        | Technology    |
| ---------------- | ------------- |
| Framework        | React 18      |
| Styling          | Tailwind CSS  |
| State Management | Redux Toolkit |
| Icons            | Lucide Icons  |

---

## 🛠️ Frontend Requirements

| Requirement | Version |
| ----------- | ------- |
| Node.js     | 18+     |
| npm / yarn  | Latest  |

---

## ▶️ Install Dependencies

```
cd showtime-frontend
npm install
```

---

## 🎨 Tailwind CSS Check

Make sure you have the following files:

**tailwind.config.js**

```
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**index.css** should contain:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ▶️ Run Frontend

```
npm start
```

Frontend starts at:

```
http://localhost:3000
```

---

# 🔗 3. Connecting Frontend to Backend

In your frontend `.env`:

```
REACT_APP_BACKEND_URL=http://localhost:8080
```

Use it inside Axios calls:

```
axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`)
```

---

# 🧪 4. Testing

| Tool      | Usage                  |
| --------- | ---------------------- |
| Postman   | Test backend endpoints |
| Redis CLI | Monitor cache GET/SET  |
| pgAdmin   | GUI for PostgreSQL     |

Monitor Redis:

```
redis-cli monitor
```

---

# 🧱 5. Build Commands

## Backend JAR build

```
mvn clean package
```

Output will be in:

```
target/showtime.jar
```

## Frontend production build

```
npm run build
```

---

# 📦 6. Docker Deployment (Optional)

Coming soon — can generate full Docker Compose for you.

---

# 🗺️ System Architecture Diagram

```
React Frontend --> Spring Boot API --> PostgreSQL
                          |
                          V
                        Redis (Cache)
```

---

# ⭐ 7. Useful Commands

| Purpose           | Mac Command              | Windows Command                   |
| ----------------- | ----------------------------- | ----------------------------------|
| Restart Redis     | `brew services restart redis`  | `net stop Redis & net start Redis`|
| Stop Redis        | `brew services stop redis`     | `net stop Redis`                  |
| Check Redis keys  | `redis-cli keys '*'`           | `redis-cli keys '*'`              |
| Clear Redis cache | `redis-cli FLUSHALL`           | `redis-cli FLUSHALL`              |
