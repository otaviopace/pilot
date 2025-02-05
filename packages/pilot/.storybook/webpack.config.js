const eslintFormatter = require('react-dev-utils/eslintFormatter')
const stylelintFormatter = require('former-kit/config/stylelintFormatter')
const postcssUrlRebase = require('former-kit/config/postcssUrlRebase')
const paths = require('react-scripts-former-kit-dashboard/config/paths')

const postCSSPlugins = [
  require('postcss-sass-each'),
  require('postcss-hexrgba'),
  require('postcss-import'),
  require('postcss-url')({
    url: postcssUrlRebase,
  }),
]

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          // {
          //   options: {
          //     formatter: eslintFormatter,
          //     eslintPath: require.resolve('eslint'),
          //   },
          //   loader: require.resolve('eslint-loader'),
          // },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.css$/,
        exclude: /react-dates/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('postcss-loader'),
            options: {
              formatter: stylelintFormatter,
              plugins: () => [
                // require('stylelint'),
                ...postCSSPlugins,
                require('postcss-cssnext')({
                  features: {
                    customProperties: {
                      strict: false,
                    },
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /.*\.css$/,
        exclude: /react-dates/,
        use: [
          // We commented this piece of code because it was causing errors
          // when running storybook after linking with the latest former-kit's
          // version.
          // TODO: Verify if it is still relevant.
          // require.resolve('style-loader'),
          // {
          //   loader: require.resolve('css-loader'),
          //   options: {
          //     importLoaders: 1,
          //     modules: true,
          //     localIdentName: '[path]-[name]-[local]',
          //   },
          // },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                ...postCSSPlugins,
                require('postcss-cssnext')({
                  // We don't transpile CSS variables module in Storybook
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        // This block matches only react-dates styles and extract them
        // separately, in a pipeline without CSS modules, as react-dates
        // uses global CSS. This is the place where all global CSS libraries
        // should be matched. Be sure to also edit the exclude regex from
        // previous test.
        test: /.*react-dates.*\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                ...postCSSPlugins,
                require('postcss-cssnext')({
                  // We don't transpile CSS variables module in Storybook
                  features: {
                    customProperties: false,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              replaceAttrValues: {
                '#000': 'currentColor',
                '#000000;': 'currentColor',
              },
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
              titleProp: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
}
