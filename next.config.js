module.exports = {
  images: {
    domains: ['www.themealdb.com'],
  },
  env: {
    FETCH_MEAL_BY_NAME: process.env.FETCH_MEAL_BY_NAME,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
