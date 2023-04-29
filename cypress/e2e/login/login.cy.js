/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://simpleusercrud.pages.dev/')
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type username', () => {
    // https://on.cypress.io/type
    cy.get('.p-2').find('[name="username"]')
      .type('Kronos', { delay: 300 }).should('have.value', 'Kronos')
  })

  it('.type() - type password', () => {
    // https://on.cypress.io/type
    cy.get('.p-2').find('[name="password"]')
        .type('Fisyb8o9h*', { delay: 300 }).should('have.value', 'Fisyb8o9h*')
  })

  it('.submit() - submit login form with out required fields', () => {
    // https://on.cypress.io/submit
    cy.get('form').submit();
  })

  it('.submit() - submit login form', () => {
    // https://on.cypress.io/submit
    cy.get('.p-2').find('[name="username"]')
        .type('Kronos', { delay: 300 }).should('have.value', 'Kronos')
    cy.get('.p-2').find('[name="password"]')
        .type('Fisyb8o9h*', { delay: 300 }).should('have.value', 'Fisyb8o9h*')
    cy.get('button[type="submit"]').click().url('https://simpleusercrud.pages.dev/')
  })

})
