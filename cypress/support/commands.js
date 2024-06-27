// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@percy/cypress';
import 'cypress-wait-until';

/**
 * Returns an iframe content
 */
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.ready(function () {
            resolve($iframe.contents().find('body'));
        });
    });
});

//custom command to check visibility of the freshChat icon
Cypress.Commands.add('checkFreshChat', () => {
    // cy.get('freshchat-widget').shadow().find('#fc-widget-chat-icon').should('be.visible') // nach PEX-4301 icon mit cypress getestet fehlend 
    // cy.screenshot()
  })

//custom command to open a selectbox
Cypress.Commands.add('openSelect', { prevSubject: 'element' }, (subject, method) => {
    const dropdown = subject[0];
    dropdown.size = dropdown.options.length;
})

//custom command to close a selectbox
Cypress.Commands.add('closeSelect', { prevSubject: 'element' }, (subject, method) => {
    const dropdown = subject[0];
    dropdown.size = 0;
})

Cypress.Commands.add('clearPopup' , () => {
    // workaorund in order to close the last opened popup
    cy.contains('Mehr erfahren').realHover().wait(500)
}) 

// This overwrite is required becuase Basic Authentification is not working
// for Electron Browser if the domain is defined by baseUrl Configuration
// see https://github.com/cypress-io/cypress/issues/1639

Cypress.Commands.overwrite('visit', (orig, url, options) => {
    options = options || {};
    if (Cypress.env('AUTH_USER') && Cypress.env('AUTH_PASS')) {
        options.auth = {
            username: Cypress.env('AUTH_USER'),
            password: Cypress.env('AUTH_PASS')
        };
    }
    return orig(url, options)
});
