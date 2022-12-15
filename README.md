# My Meal Plan

Meals Api: https://www.themealdb.com/api.php

Website Url: https://my-meal-plan.vercel.app/

## Main technologies:

- NextJs + typescript
- Styled-components
- React-query
- Axios
- Next-auth
- Prisma + Planetscale db
- Vercel hosting
- React-testing-library & Jest
- Cypress
- Husky precommit hooks

## Testing with:

- react testing library & jest
- cypress (e2e - end to end tests)

## Application description:

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
