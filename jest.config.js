module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    './node_modules/',
  ],
  collectCoverageFrom: [
    '**/*.js',
    '!./const.js',
    '!./logger.js',
    '!./jest.config.js',
    '!**/index.js',
    '!./server.js',
  ],
  coveragePathIgnorePatterns: ['./coverage/'],
  reporters: ['default', 'jest-junit'],
  verbose: true,
  testEnvironment: 'node',
};
