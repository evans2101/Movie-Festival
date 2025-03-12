const { defaults } = require('jest-config');

/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts', 'vue'],
  collectCoverageFrom: [
    '**/*.{js,jsx,vue}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
    './src/components/': {
      branches: 40,
      statements: 40,
    },
    './src/reducers/**/*.js': {
      statements: 90,
    },
    './src/api/very-important-module.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = config;
