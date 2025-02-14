# Easy Appointment Booking System

## Installation Instructions

### 1. Clone the Repository
```bash
git clone your-repo-link
```

### 2. Navigate to Frontend & Install Dependencies
```bash
cd appointment-booking
npm install
npm run dev
```

### 3. Navigate to Backend & Install Dependencies
```bash
cd server
npm install
node server.js
```

### 4. Configure Environment Variables
Create a `.env` file in the `server` folder and add:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=appointments_db
PORT=5001
JWT_SECRET=mysecretkey
```

