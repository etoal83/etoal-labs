const { withExpo } = require('@expo/next-adapter');
const withTM = require('next-transpile-modules')([
  'drei',
  'three',
  '@emotion/native',
  // 'postprocessing',
]);

module.exports = withExpo(
  withTM({
    projectRoot: __dirname,
    webpack: (config, options) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        'react-native$': 'react-native-web',
      };
      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions,
      ];
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      });

      return config;
    },
  })
);
