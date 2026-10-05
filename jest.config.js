module.exports = {
  preset: '@react-native/jest-preset',
  // RTK ships ESM deps (immer/redux/reselect) that must be transformed.
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@reduxjs/toolkit|immer|redux|reselect|redux-thunk)/)',
  ],
};
