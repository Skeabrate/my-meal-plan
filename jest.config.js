const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './src',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^templates/(.*)$': '<rootDir>/src/templates/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^context/(.*)$': '<rootDir>/src/context/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/matchmedia'],
};

module.exports = createJestConfig(customJestConfig);
