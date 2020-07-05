'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(currentPath, needsSlash) {
  const hasSlash = currentPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return currentPath.substr(currentPath, currentPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${currentPath}/`;
  } else {
    return currentPath;
  }
}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  if (publicUrl == null) {
    return '/';
  } else {
    const parsedPublicUrl = url.parse(publicUrl);
    return ensureSlash(parsedPublicUrl.pathname, true);
  }
}

// config after eject: we're in ./config/
module.exports = {
  ansiStyles: resolveApp('node_modules/ansi-styles'),
  appBuild: resolveApp('build'),
  appConfigScripts: resolveApp('config'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveApp('tslint.json'),
  appTsProdConfig: env => resolveApp(`tsconfig.${env}.json`),
  dotenv: resolveApp('.env'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  testsSetup: resolveApp('src/setupTests.ts'),
};
