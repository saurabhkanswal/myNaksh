module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Reanimated v4 uses the worklets babel plugin; it must be listed last.
  plugins: ['react-native-worklets/plugin'],
};
