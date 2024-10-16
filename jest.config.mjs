/** @type {import('jest').Config} */
export default {
  preset: "@quasar/quasar-app-extension-testing-unit-jest",
  testResultsProcessor: "jest-junit",
  // collectCoverage: true,
  // coverageThreshold: {
  //   global: {
  //      branches: 50,
  //      functions: 50,
  //      lines: 50,
  //      statements: 50
  //   },
  // },
  transform: {
    ".*\\.js$": "babel-jest",
  },
  reporters: ["default", "jest-sonar"],
};
