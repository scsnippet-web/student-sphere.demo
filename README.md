 # Student-Sphere

 # Overview
The **Student-Sphere** is a centralized web-based platform designed to help students efficiently manage their academic performance and daily productivity in one place.

It provides essential tools to track **CGPA, attendance, documents, tasks, expenses, and goals**, ensuring students stay organized, informed, and consistent throughout their academic journey<div align="center">

```
 ███████╗████████╗██╗   ██╗██████╗ ███████╗███╗   ██╗████████╗
 ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝████╗  ██║╚══██╔══╝
 ███████╗   ██║   ██║   ██║██║  ██║█████╗  ██╔██╗ ██║   ██║
 ╚════██║   ██║   ██║   ██║██║  ██║██╔══╝  ██║╚██╗██║   ██║
 ███████║   ██║   ╚██████╔╝██████╔╝███████╗██║ ╚████║   ██║
 ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝

  ███████╗██████╗ ██╗  ██╗███████╗██████╗ ███████╗
  ██╔════╝██╔══██╗██║  ██║██╔════╝██╔══██╗██╔════╝
  ███████╗██████╔╝███████║█████╗  ██████╔╝█████╗
  ╚════██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗██╔══╝
  ███████║██║     ██║  ██║███████╗██║  ██║███████╗
  ╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
```

**Your Personal Academic & Productivity Companion**

*Track. Organize. Achieve.*

[![License: GNU](https://img.shields.io/badge/License-GNu-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Backend: Django](https://img.shields.io/badge/Backend-Django_REST-092E20?logo=django)](https://www.django-rest-framework.org/)
[![DB: MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

## What is Student Sphere?

**Student Sphere** is a full-stack, centralized web platform designed to help students manage their academic performance and daily productivity — all in one place.

From tracking your **CGPA and attendance** to managing **documents, tasks, expenses, and goals**, Student Sphere eliminates the need for juggling multiple tools. Everything a student needs to stay organized, informed, and on track lives under one roof.

No clutter. No context switching. Just clarity.

---

## Team

| Member | Role |
|---|---|
| 👑 **Tarun Gupta** | Project Lead — architecture, integration, roadmap |
| 🎨 **Sumit Chourasia & Suraj Prajapati** | Frontend Engineer — React UI, dashboard, components |
| 🔧 **Palash Gupta** | Backend Engineer — Django REST API, auth, business logic |
| 🗄️ **Tarun Gupta** | Database Engineer — MySQL schema, queries, optimization |



---

## Why Student Sphere?

| Feature | Student Sphere | Scattered Tools (Notion, Excel, Drive…) |
|---|---|---|
| CGPA & SGPA calculator | ✅ Built-in | ❌ Manual setup |
| Attendance eligibility check | ✅ Automated | ❌ Manual math |
| Document storage | ✅ Centralized | ❌ Multiple apps |
| Expense tracking | ✅ Categorized | ❌ Separate app |
| Goal tracking with deadlines | ✅ Yes | ❌ Varies |
| Single login for everything | ✅ Yes | ❌ No |

---

## How It Works

```
STUDENT
  │
  │  1. Log in to Student Sphere
  │
  ├──▶ 📊 CGPA Module      → Enter marks → Auto-calculate SGPA/CGPA
  │
  ├──▶ 📋 Attendance Module → Log subject hours → Check eligibility
  │
  ├──▶ 📁 Documents         → Upload certificates, marksheets, IDs
  │
  ├──▶ ✅ To-Do List        → Add daily tasks → Mark as complete
  │
  ├──▶ 💸 Expense Tracker   → Log spends → View by category/month
  │
  └──▶ 🎯 Goal Tracker      → Set targets → Track progress
               │
               ▼
         📌 Dashboard
   (Unified view of all modules)
```

All data is persisted in a **MySQL database** via a **Django REST API**, consumed by a **React frontend**.

---


## Core Features

### 📊 CGPA & Attendance Management
Calculate **SGPA and CGPA** based on subject-wise marks. Track per-subject attendance and instantly determine whether you meet the required attendance criteria — no manual calculation needed.

### 📁 Document Management
Securely upload and store your academic documents — ID cards, marksheets, and certificates — in one place. Access them anytime without hunting through folders or drives.

### ✅ Daily To-Do List
Create, manage, and tick off daily tasks. Stay on top of assignments, submissions, and personal errands without leaving the platform.

### 💸 Expense Tracker
Log daily expenses, categorize them (Food, Travel, Stationery, etc.), and view breakdowns by day or month. Stay financially aware throughout your semester.

### 🎯 Goal Tracker
Set academic or personal goals with deadlines and targets. Visualize progress and stay accountable to what matters most.

### 📌 Unified Dashboard
A single command center showing your current CGPA, attendance status, pending tasks, recent expenses, and active goals — at a glance.

---

## Technical Stack

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | React | Component-based UI, routing, state management |
| **Backend** | Django REST Framework | REST API, authentication, business logic |
| **Core Language** | Python | Server-side logic |
| **Database** | MySQL | Persistent data storage |
| **API Style** | REST | Client-server communication |

---

## Getting Started

### Prerequisites
- Python `3.10+`
- Node.js `v18+`
- MySQL `8.0+`
- A modern browser (Chrome, Firefox, Edge)

### Installation

```bash
# Clone the repo
git clone https://github.com/tarungupta786/student-sphere.git
cd student-sphere
```

#### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure your MySQL credentials in settings.py
# Then run migrations
python manage.py migrate

# Start the Django server
python manage.py runserver
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

Open `http://localhost:3000` in your browser. The Django API runs on `http://localhost:8000`.

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DB_NAME=student_sphere
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=your_django_secret_key
DEBUG=True
```

---

## Project Structure

Current workspace folder structure:

```
student-sphere/
├── LICENSE
├── README.md
├── backend/
│   ├── db.sqlite3
│   ├── manage.py
│   ├── attendance/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── cgpataget.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── 0001_initial.py
│   │   │   └── __pycache__/
│   │   └── __pycache__/
│   ├── dashboard/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   └── __pycache__/
│   ├── document/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── 0001_initial.py
│   │   │   └── __pycache__/
│   │   └── __pycache__/
│   ├── expenses/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   └── __pycache__/
│   ├── goals/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   └── 0001_initial.py
│   │   └── __pycache__/
│   ├── noteshub/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   └── 0001_initial.py
│   │   └── __pycache__/
│   ├── tasks/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   └── 0001_initial.py
│   │   └── __pycache__/
│   ├── users/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   └── __pycache__/
│   └── studentsphere/
│       ├── __init__.py
│       ├── asgi.py
│       ├── settings.py
│       ├── urls.py
│       ├── wsgi.py
│       └── __pycache__/
├── frontend/
│   └── frontend/
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── README.md
│       ├── vite.config.js
│       ├── public/
│       │   ├── form.html
│       │   ├── script.js
│       │   └── style.css
│       └── src/
│           ├── App.jsx
│           ├── index.css
│           ├── main.jsx
│           ├── api/
│           │   └── axios.js
│           └── components/
│               └── Navbar.jsx
└── README.md
```
---

## Roadmap

- [ ] Email / notification reminders for attendance threshold
- [ ] CGPA trend graph over semesters
- [ ] Collaborative notes & resource sharing between students
- [ ] Mobile PWA support
- [ ] Export reports (attendance, CGPA, expenses) as PDF
- [ ] OAuth login (Google / GitHub)

---

## Contributing

Contributions are welcome — bug reports, feature ideas, or pull requests.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Commit your changes: `git commit -m 'Add: your feature'`
4. Push and open a Pull Request

Please keep PRs focused and include a clear description of what changed and why.

---

## License

 GNU GENERAL PUBLIC LICENSE — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with 💙 by **Student Sphere Team** · One platform. Every student need.

</div>.


