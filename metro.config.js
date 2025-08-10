/**
 * Metro configuration for React Native
 * https://github.com/facebook/metro
 */
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    assetExts: [...config.resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif', 'webp'],
    platforms: ['ios', 'android', 'native', 'web'],
  },
  transformer: {
    ...config.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
  