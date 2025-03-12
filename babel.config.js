module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@vue/babel-preset-app', // Add this line for Vue
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
};
