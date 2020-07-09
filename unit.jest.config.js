module.exports = {
  name: 'unit',
  automock: false,
  displayName: 'Unit Tests',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFiles: ['<rootDir>/src/config/polyfills.js', '<rootDir>/setupJest.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
    '<rootDir>/src/**/*.(spec|test).(j|t)s?(x)',
  ],
  testEnvironment: 'jsdom',
  testURL: process.env.TEST_HOST || 'http://localhost:4444',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/src/config/jest/cssTransform.js',
    '^.+\\.ya?ml$': '<rootDir>/src/config/jest/yamlTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/src/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'web.js',
    'js',
    'yml',
    'yaml',
    'web.jsx',
    'jsx',
    'json',
    'node',
    'mjs',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
};
