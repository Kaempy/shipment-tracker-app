const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
   assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'json'],
    sourceExts: [...sourceExts, 'svg'],
  },
};
const nativeWindConfig = withNativeWind(defaultConfig, { input: './src/global.css' });

module.exports = mergeConfig(nativeWindConfig, config);