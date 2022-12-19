# My Meal Plan

Website Url: https://my-meal-plan.vercel.app/

## Main technologies:

- NextJs + typescript
- Styled-components
- Planetscale db
- Prisma
- React-query
- Axios
- NextAuth.js
- Vercel hosting
- React-testing-library & Jest
- Cypress
- Husky precommit hooks

## Testing with:

- react testing library & jest
- cypress (e2e - end to end tests)

## Application description:

Search for meals and recipes from all over the world, save your favorites and create meal plans!

Applitacion is build using NextJS with typescript and hosted by Vercel.

App URL: https://my-meal-plan.vercel.app/

Meals API: https://www.themealdb.com/api.php

Styling - styled-components - leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS. Based on tagged template literals, meaning actual CSS code is written between backticks when styling your components.

Database for storing users accounts, sessions tokens and meal plans - planetscale.
PlanetScale is a limitless scaling, MySQL-compatible, serverless database.

Database ORM - Prisma - an open-source ORM that integrates with PlanetScale. Allows you to define database schema declaratively using the Prisma schema fetch data from PlanetScale with full type safety using Prisma Client.

Fetching, caching, synchronizing and updating server state - react-query - data-fetching library for React which allows you to control server state in your application.

User authentication, authorization and managing sessions tokens - NextAuth.js - complete open-source authentication solution for Next.js applications which supports secure, passwordless sign-in mechanisms via different popular OAuth providers.

Testing tools: react-testing-library, jest and cypress.

#### Navigation bar:

- MyMealPlan logo / Home - homepage

- Favorites - favorite meals list

- Meal Plans - if user is logged in, links to created meal plans otherwise redirects to login/signin screen

- Theme combobox - user can chose colors theme between light / dark and color based on system settings

- Search - user can search for any meal by name

- Profile - if user is logged in, links to the profile dashboard page otherwise redirects to login/signin screen

#### Homepage (https://my-meal-plan.vercel.app/):

- home

#### Meals by Category Page (https://my-meal-plan.vercel.app/category/categoryName):

- meals by category

#### Meal Page (https://my-meal-plan.vercel.app/meal/mealId):

- meal page

#### Favorites (https://my-meal-plan.vercel.app/favorites):

- favorites

#### Profile (https://my-meal-plan.vercel.app/profile/overview):

- profile

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Meals API:

`FETCH_MEAL_BY_NAME=https://www.themealdb.com/api/json/v1/1/search.php?s=`

`FETCH_MEAL_BY_ID=https://www.themealdb.com/api/json/v1/1/lookup.php?i=`

`FETCH_MEALS_BY_CATEGORY=https://www.themealdb.com/api/json/v1/1/filter.php?c=`

`FETCH_CATEGORIES=https://www.themealdb.com/api/json/v1/1/categories.php`

- Planetscale database:

`DATABASE_URL`

- Next-auth:

`SECRET`

`NEXTAUTH_URL`

- GitHub Authentication Provider:

`GITHUB_ID`

`GITHUB_SECRET`

- Facebook Authentication Provider:

`FACEBOOK_ID`

`FACEBOOK_SECRET`

- SendGrid SMTP:

`EMAIL_SERVER_HOST`

`EMAIL_SERVER_PORT`

`EMAIL_SERVER_USER`

`EMAIL_SERVER_PASSWORD`

`EMAIL_FROM`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Skeabrate/my-meal-plan.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following commands:

- react-testing-library & jest:

```bash
  npm run test:all
```

- cypress:

```bash
  npm run test:e2e
```
