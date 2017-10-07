// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // config.resolve.extensions.push('.ts', '.tsx');
  // config.resolve.alias = Object.assign(
  //   config.resolve.alias,
  //   {
  //     'react-infinitytracks': path.join(__dirname, '..', 'src')
  //   }
  // );

  return config;
};
