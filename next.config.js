module.exports = {
  images: {
    domains: ['www.themealdb.com'],
  },
  env: {
    FETCH_CATEGORIES: process.env.FETCH_CATEGORIES,
    FETCH_MEAL_BY_ID: process.env.FETCH_MEAL_BY_ID,
    FETCH_MEAL_BY_NAME: process.env.FETCH_MEAL_BY_NAME,
    FETCH_MEALS_BY_CATEGORY: process.env.FETCH_MEALS_BY_CATEGORY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
