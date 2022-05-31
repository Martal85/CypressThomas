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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('OpenHomePage', () => {  
    cy.visit('https://www.feefo.com')
    cy.get('#hs-eu-confirmation-button')
        .click()
    cy.url().should('eq', 'https://www.feefo.com')     
    })

Cypress.Commands.add('OpenLoginPage', () => {  
    cy.visit('https://www.feefo.com')
    cy.get('#hs-eu-confirmation-button')
        .click() 
    cy.get('.header-button-two > a')
        .click()
    cy.url().should('eq', 'https://hub.feefo.com/login')        
    })