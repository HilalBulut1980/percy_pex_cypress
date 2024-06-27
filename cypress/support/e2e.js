// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@percy/cypress'
import "cypress-real-events";

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  if (Cypress.env('catch_JS_Error')) {
    cy.on('uncaught:exception', (err, runnable) => {
      // return false to prevent the error from
      // failing this test
      return false
    })
  }

cy.intercept({
  method: 'GET',
  url: Cypress.env('js_files_url'),
  hostname: Cypress.env('js_files_hostname'),
}).as('configurator-js-files')

cy.intercept('GET', '/prices/split_by_pg/vs1vs2_pg2.json').as('prices_vertical')
cy.intercept('GET', '/prices/split_by_pg/dfnonstandard_pg2.json').as('prices_roof')
cy.intercept('GET', '/prices/split_by_pg/f1f3_pg2.json').as('prices_special')

})

