module.exports = {
  displayName: 'Visual Regression Tests',
  name: 'visual',
  preset: 'jest-puppeteer',
  testURL: process.env.TEST_HOST || 'http://localhost:4444',
  testMatch: ['<rootDir>/src/visualRegressionTest.ts'],
  setupFiles: ['<rootDir>/src/config/polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/src/config/jest/imageSnapshot.ts'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/src/config/jest/cssTransform.js',
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
