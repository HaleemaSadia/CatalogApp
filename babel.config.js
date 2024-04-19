module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: [
          {'@test': './__tests__/'},
          {'@app': './src/app/'},
          {'@resources': './src/resources/'},
          {'@typings': './src/typings/'},
          {'@ui': './src/ui/'},
          {'@utils': './src/utils/'},
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
