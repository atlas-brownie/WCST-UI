// If you are looking to add an additional file hosted at the root of the project see the readme
// section `Revproxy Routing` (https://github.com/department-of-veterans-affairs/developer-portal/blob/master/README.md#revproxy-routing)

'use strict';

const fs = require('fs');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Webpack uses `output.publicPath`, from it's options object, to determine
// where the app is being served from. It requires a trailing slash, or the
// file assets will get an incorrect path.
const publicPath = paths.servedPath;
const publicPathNoSlash = publicPath.replace(/[/]+$/, '');
const env = getClientEnvironment(publicPathNoSlash);

// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined,
      ),
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: shouldUseSourceMap,
      },
    },
  ];
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: shouldUseSourceMap,
      },
    });
  }
  return loaders;
};

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = (envName) => {
  return {
    // Don't attempt to continue if there are any errors.
    bail: true,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: shouldUseSourceMap ? 'source-map' : false,
    // In production, we only want to load the polyfills and the app code.
    entry: [require.resolve('./polyfills'), paths.appIndexJs],
    mode: 'production',
    module: {
      rules: [
        // TODO: Disable require.ensure as it's not a standard language feature.
        // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
        // { parser: { requireEnsure: false } },
        {
          enforce: 'pre',
          include: paths.appSrc,
          loader: require.resolve('source-map-loader'),
          test: /\.(js|jsx|mjs)$/,
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // `MiniCSSExtractPlugin` extracts styles into CSS
            // files. If you use code splitting, async bundles will have their own separate CSS chunk file.
            // By default we support CSS Modules with the extension .module.css
            {
              exclude: cssModuleRegex,
              loader: getStyleLoaders({
                importLoaders: 1,
                sourceMap: shouldUseSourceMap,
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
              test: cssRegex,
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              loader: getStyleLoaders({
                getLocalIdent: getCSSModuleLocalIdent,
                importLoaders: 1,
                modules: true,
                sourceMap: shouldUseSourceMap,
              }),
              test: cssModuleRegex,
            },
            // Opt-in support for SASS. The logic here is somewhat similar
            // as in the CSS routine, except that "sass-loader" runs first
            // to compile SASS files into CSS.
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            {
              exclude: sassModuleRegex,
              loader: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: shouldUseSourceMap,
                },
                'sass-loader',
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
              test: sassRegex,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
              loader: getStyleLoaders(
                {
                  getLocalIdent: getCSSModuleLocalIdent,
                  importLoaders: 2,
                  modules: true,
                  sourceMap: shouldUseSourceMap,
                },
                'sass-loader',
              ),
              test: sassModuleRegex,
            },
            {
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                compact: true,
              },
              test: /\.(js|jsx|mjs)$/,
            },
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                cacheDirectory: true,
                compact: false,
                presets: [require.resolve('babel-preset-react-app/dependencies')],
              },
              test: /\.(js|jsx|mjs)$/,
            },
            // Compile .tsx?
            {
              include: paths.appSrc,
              test: /\.(ts|tsx)$/,
              use: [
                {
                  loader: require.resolve('ts-loader'),
                  options: {
                    // disable type checker - we will use it in fork plugin
                    configFile: paths.appTsProdConfig(envName),
                    transpileOnly: true,
                  },
                },
              ],
            },
            // Load .mdx files as components
            // {
            //   include: paths.appSrc,
            //   test: /\.mdx$/,
            //   use: [
            //     'babel-loader',
            //     {
            //       loader: 'markdown-component-loader',
            //       options: {
            //         enabledMarkdownItRules: ['smartquotes', 'table'],
            //         markdownItPlugins: [[require('markdown-it-anchor'), { level: 2 }]],
            //       },
            //     },
            //   ],
            // },
            {
              include: paths.appSrc,
              test: /\.ya?ml$/,
              use: 'js-yaml-loader',
            },
            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
      strictExportPresence: true,
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      child_process: 'empty',
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    output: {
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: (info) =>
        path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename: 'static/js/[name].[chunkhash:8].js',
      // The build folder.
      path: path.join(paths.appBuild, envName),
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: publicPath,
    },
    performance: {
      assetFilter: function (assetFilename) {
        // only check CSS bundle size, as our JS bundle is currently over 2M
        return assetFilename.endsWith('.css');
      },
      hints: 'error',
      maxAssetSize: 600000,
      maxEntrypointSize: 600000,
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      // new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      new TsconfigPathsPlugin({ configFile: paths.appTsConfig }),
      new HtmlWebpackPlugin({
        inject: true,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        template: paths.appHtml,
      }),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In production, it will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      // new ModuleNotFoundPlugin(paths.appPath),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV was set to production here.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin(env.stringified),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        filename: 'static/css/[name].[contenthash:8].css',
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: shouldUseSourceMap,
        },
      }),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the Webpack build.
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: 'cdn',
        navigateFallback: publicPathNoSlash + '/index.html',
        navigateFallbackBlacklist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude URLs containing a dot, as they're likely a resource in
          // public/ and not a SPA route
          new RegExp('/[^/]+\\.[^/]+$'),
        ],
        skipWaiting: true,
      }),
      // TypeScript type checking
      fs.existsSync(paths.appTsConfig) &&
        new ForkTsCheckerWebpackPlugin({
          async: false,
          checkSyntacticErrors: true,
          compilerOptions: {
            jsx: 'preserve',
            module: 'esnext',
            moduleResolution: 'node',
            noEmit: true,
            resolveJsonModule: true,
          },
          reportFiles: [
            '**',
            '!**/*.json',
            '!**/__tests__/**',
            '!**/?(*.)(e2e|spec|test).*',
            '!src/setupProxy.js',
            '!src/setupTests.*',
          ],
          silent: true,
          tsconfig: paths.appTsProdConfig(envName),
          typescript: resolve.sync('typescript', {
            basedir: paths.appNodeModules,
          }),
          watch: paths.appSrc,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
      },
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebookincubator/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: [
        '.mjs',
        '.web.ts',
        '.ts',
        '.web.tsx',
        '.tsx',
        '.web.js',
        '.js',
        '.json',
        '.web.jsx',
        '.jsx',
      ],
      // This allows you to set a fallback for where Webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebookincubator/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        // It is guaranteed to exist because we tweak it in `env.js`
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
      ),
    },
  };
};
