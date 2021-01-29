module.exports = {
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10
    }
  },
  collectCoverageFrom: [
    '*.js',
    '**/*.js'
  ],
  reporters: ['default', 'jest-junit']
};
