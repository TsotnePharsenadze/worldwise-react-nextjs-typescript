<div align="center">
  <br/>
<div class="display: flex; align-items:center; justify-content:center;">
              <img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/logo.png" style="height: 100px; width: 100px;" /> <h1 style="font-size: 70px;"> WorldWise in Next.js, Typescript, Next-Auth and Prisma</h1>
</div>
  <br/>
  <p>
Converted/Completed, WorldWise app, previously built only in React, which didn't included real database connection nor it included authentication system.
  </p>
<table>
      <tr>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/1.PNG" alt="10pic-light" width="300"></td>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/2.PNG" alt="10pic" width="300"></td>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/3.PNG" alt="13mobile" width="300"></td>
        </tr>
</table>
  <p>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/WalleMechson/worldwise-react-nextjs-typescript" alt="contributors" />
    </a>
    <a href="">
      <img src="https://img.shields.io/github/last-commit/WalleMechson/worldwise-react-nextjs-typescript" alt="last update" />
    </a>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/network/members">
      <img src="https://img.shields.io/github/forks/WalleMechson/worldwise-react-nextjs-typescript" alt="forks" />
    </a>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/stargazers">
      <img src="https://img.shields.io/github/stars/WalleMechson/worldwise-react-nextjs-typescript" alt="stars" />
    </a>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/issues/">
      <img src="https://img.shields.io/github/issues/WalleMechson/worldwise-react-nextjs-typescript" alt="open issues" />
    </a>
  </p>
   
  <h4>
    <a href="#">Demo currently not avaliable because of the cost of third-party tools</a>
    <span> · </span>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/readme.md">Documentation</a>
    <span> · </span>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/issues/">Request Feature</a>
  </h4>
</div>

<br/>

## Features

1. **Interactive Map for Saved Trips:**
   - Visualize all your trips on a world map with markers for each saved location.

2. **Location detection upon click on map:**
   - Uses geolocation APIs to auto-detect the city, country, and region when you select a spot on the map and Provides options for manual adjustments, adding detailed notes, and setting travel dates for each trip.

3. **Next-Auth Authentication/Registration:**
   - Secure authentication using Next-Auth, supporting credential authentication and registration for users.

4. **Database Powered by Neon.tech:**
   - Utilizes Neon.tech for a scalable and performant database, with Prisma as the ORM for efficient data management.

<br/>

## Installation

- Clone the repository:

  ```bash
  git clone https://github.com/WalleMechson/worldwise-react-nextjs-typescript
  ```

- Navigate to the project directory:

  ```bash
  cd discord
  ```

- Install the dependencies:

  ```bash
  npm install
  ```

- Create .env file and setup all the neccessary env variables (Neon.tech database and secret for Next-Auth)

```
DATABASE_URL=""
AUTH_SECRET=""
```

- Set up Neon.tech and generate/push Prisma models:

  1. Open new terminal and exec `npx prisma generate`
  2. then `npx prisma db push`

<br/>

## Usage

- Start the development server:

  ```bash
  npm run dev
  ```

- Open your browser and visit `http://localhost:3000` to access the application.

<br/>

## :camera: Screenshots
<table>
      <tr>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/1.PNG" alt="10pic-light" width="300"></td>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/5.PNG" alt="10pic" width="300"></td>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/2.PNG" alt="13mobile" width="300"></td>
        </tr>
        <tr>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/6.PNG" alt="11pic-light" width="300"></td>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/3.PNG" alt="11pic" width="300"></td>
            <td><img src="https://github.com/WalleMechson/worldwise-react-nextjs-typescript/blob/main/public/forGithub/4.PNG" alt="1mobile" width="300"></td>
        </tr>
</table>

<br/>

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes to the new branch.
- Open a pull request back to the main repository, including a description of your changes.
