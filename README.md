# Round-Robin Coupon Distribution with Abuse Prevention

## Overview

This project implements a **round-robin coupon distribution system** with abuse prevention mechanisms using **React.js** for the frontend and **Node.js (Express)** for the backend. No database is used; all data is stored in memory on the server.

## Features

-  **Round-robin coupon assignment**: Coupons are distributed sequentially.
-  **Guest access**: Users can claim coupons without logging in.
-  **Abuse prevention**:
   -  **IP tracking**: Prevents multiple claims from the same IP within 1 hour.
   -  **Cookie tracking**: Blocks multiple claims from the same browser session.
-  **User feedback**: Displays success or restriction messages.

## Tech Stack

-  **Frontend**: React.js (Vite), Axios, Tailwind CSS
-  **Backend**: Node.js, Express, CORS, Cookie-Parser

---

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/SauravChaudhary26/sales-studio-assignment.git
cd sales-studio
```

### 2. Setup the Backend

```sh
cd coupon-backend
npm install
node server.js
```

The backend runs on `http://localhost:5000`.

### 3. Setup the Frontend

```sh
cd ../coupon-distributor
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## API Endpoints

### `POST /claim`

-  **Description**: Assigns a coupon to the user if they haven't claimed one recently.
-  **Response**:
   -  `200 OK`: `{ coupon: 'COUPON1', message: 'Coupon claimed successfully!' }`
   -  `403 Forbidden`: `{ message: 'You can claim another coupon after 1 hour.' }`

---

## Abuse Prevention Strategies

1. **IP Tracking**: Users' IP addresses are logged to restrict multiple claims within an hour.
2. **Cookie-Based Tracking**: A cookie prevents repeated claims from the same browser.
3. **CORS Protection**: Only requests from allowed origins are accepted.

---

## Future Enhancements

-  Add CAPTCHA verification.
-  Implement server-side rate limiting.
-  Integrate a database for persistent storage.

---
