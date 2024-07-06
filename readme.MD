# League Master

League Master is a dynamic web application designed to facilitate the creation and management of sports leagues. Users can effortlessely create new leagues, add teams in it and track the progress of each leagues through comprehensive points tables and match results. It uses a full-stack approach, It utilizes Node Js, Express Js, React Js and PostgreSQL.

## Table of Contents

- [Features](#Features)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [API Documentation](#api-documentation)
- [Database Schema](#db-schema)

## Features

- **Secure Authentication:** Enjoy a safe and secure login process.
- **Attractive UI**: Experience an attractive and visually pleasing chat interface that enhances your experience.
- **League Creation**: Users can create new leagues, specifying details such as league name and league type.
- **Team Management**: Users can add, edit and delete teams within each league.
- **Match Scheduling and Results**: Schedule matches between teams and record match results including scores.
- **Points Table**: Automatically generate and update points tables based on match results.
- **Invite Users**: Invite other users in the league to share standings and match results seamlessly.

## Technologies

- **Backend** Node Js, Express Js
- **Frontend** React Js
- **Database** PostgreSQL
- **ORM** Prisma
- **API Documentation** Swagger

## Installation

### Prerequisites

- Node Js
- PostgreSQL

### Backend Setup

1. Clone the repository:

```bash
git clone https://gitlab.taskgrids.com/vansh.gandhi/leaguemaster.git
cd server-side
```

2. Install the backend dependencies:

```bash
npm Install
```

3. Configure environment varibales:

Create a '.env' file in the server-side folder and add the mentioned variables in .env-example.md file.


4. Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

5. Start the backend server

```bash
npm run dev
```
## API Documentation

Swagger is used to document and test the APIs. Once the backend server is running you can access swagger at http://localhost:4000/api-docs.

## Database Schema

Here is the overview of Database schema:

![Screenshot_from_2024-07-06_14-16-47](/uploads/1c4e42906d581dc1cffe0236d21a4ecd/Screenshot_from_2024-07-06_14-16-47.png)
