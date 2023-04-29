/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://simpleusercrud.pages.dev/')
  })

  it('type() - type diferents kind of task', () => {
    // Login
    cy.get('.p-2').find('[name="username"]')
        .type('Kronos')
    cy.get('.p-2').find('[name="password"]')
        .type('Fisyb8o9h*')

    cy.get('button[type="submit"]').click()

    cy.wait(2000)
    // Try diferent input combination
    cy.get('.p-2')
        .find('input[type="text"]')
        .type('Normal Text', { delay: 400 }).should('have.value', 'Normal Text')

    cy.wait(500)
    cy.get('.p-2')
        .find('input[type="text"]')
        .clear()

    cy.get('.p-2')
        .find('input[type="text"]')
        .type("@arroba", { delay: 400 }).should('have.value', "@arroba")

    cy.wait(500)
    cy.get('.p-2')
        .find('input[type="text"]')
        .clear()

    cy.get('.p-2')
        .find('input[type="text"]')
        .type('#hashtab', { delay: 400 }).should('have.value', '#hashtab')

    cy.wait(500)
    cy.get('.p-2')
        .find('input[type="text"]')
        .clear()

    cy.get('.p-2')
        .find('input[type="text"]')
        .type('email@test.com', { delay: 400 }).should('have.value', 'email@test.com')

    cy.wait(500)
    cy.get('.p-2')
        .find('input[type="text"]')
        .clear()

    cy.get('.p-2')
        .find('button[type="button"]').click()

  })

  it('type() - insert task', () => {
    // Login
    cy.get('.p-2').find('[name="username"]')
        .type('Kronos').should('have.value', 'Kronos')
    cy.get('.p-2').find('[name="password"]')
        .type('Fisyb8o9h*').should('have.value', 'Fisyb8o9h*')

    cy.get('button[type="submit"]').click()

    cy.wait(2000)
    // Try diferent input combination
    cy.get('.p-2')
        .find('input[type="text"]')
        .type('Normal Text', { delay: 300 })
    cy.get('.p-2')
        .find('button[type="button"]').click()

  })

})
