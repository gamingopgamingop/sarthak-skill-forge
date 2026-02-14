// jest.config.js
// @ts-nocheck
// @ts-ignore

import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transformIgnorePatterns: ['/node_modules/(?!drizzle-orm)'],
  collectCoverageFrom: [
  'src/**/*.{js,jsx,ts,tsx}',
  '!src/**/*.d.ts',
  '!src/**/*.stories.{js,jsx,ts,tsx}',
],
coverageThreshold: {
  global: { branches: 80, functions: 80, lines: 80, statements: 80 },
},
transformIgnorePatterns: [
  '/node_modules/(?!(your-esm-package)/)',
],
};

export default createJestConfig(customJestConfig);
