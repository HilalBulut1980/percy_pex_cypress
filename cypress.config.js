const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'rbsf7w',
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 120000,
  responseTimeout: 90000,
  requestTimeout: 50000,
  userAgent: 'testing_agent_visual',
  redirectionLimit: 100,
  env: {
    AUTH_USER: '',
    AUTH_PASS: '',
    js_files_url: '/js_minify/*.min.js',
    js_files_hostname: '.',
    catch_JS_Error: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: '',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
