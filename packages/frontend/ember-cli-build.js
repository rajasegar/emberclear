'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let disabledAddons = [];

  if (EmberApp.env() !== 'production' && !process.env.ENABLE_SW) {
     // disable service workers by default for dev and testing
     disabledAddons.push('ember-service-worker');
   }


  let app = new EmberApp(defaults, {
    // eslint slows down the dev-build-debug cycle significantly
    // hinting: false disables linting at build time.
    hinting: false,
    eslint: {
      testGenerator: 'qunit',
      group: true,
      rulesDir: 'eslint-rules',
      extensions: ['js', 'ts'],
    },
    addons: {
      blacklist: disabledAddons
    },
    // always enable sourcemaps, even in production
    // (cause debugging!)
    // sourcemaps: {
    //   enabled: true,
    //   extensions: ['js', 'css'],
    // },
    prember: {
      urls: [
        '/',
        '/faq',
        '/chat',
      ]
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // phoenix sockets!
  app.import('node_modules/phoenix/assets/js/phoenix.js', {
    using: [{ transformation: 'cjs', as: 'phoenix' }],
  });

  // font awesome
  app.import('vendor/fontawesome/css/font-awesome-all.min.css');
  var fontTree = new Funnel('vendor/fontawesome/webfonts', { destDir: '/assets/fontawesome/webfonts' });
  var fontStyleTree = new Funnel('vendor/fontawesome/css', { destDir: '/assets/fontawesome/css' });

  // libsodium
  app.import('node_modules/libsodium/dist/modules/libsodium.js');
  app.import('node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js');
  app.import('vendor/shims/libsodium.js');
  app.import('vendor/shims/libsodium-wrappers.js');

  // qrcode
  app.import('node_modules/qrcode/build/qrcode.min.js');
  app.import('vendor/shims/qrcode.js');

  // localforage
  app.import('node_modules/localforage/dist/localforage.js');
  app.import('vendor/shims/localforage.js');

  // uuid
  app.import('node_modules/uuid/index.js', {
    using: [{ transformation: 'cjs', as: 'uuid' }]
  });

  // bulma-toast
  app.import('node_modules/bulma-toast/dist/bulma-toast.js');
  app.import('vendor/shims/bulma-toast.js');
  app.import('node_modules/bulma-toast/dist/bulma-toast.min.css');

  return mergeTrees([app.toTree(), fontTree, fontStyleTree]);
};