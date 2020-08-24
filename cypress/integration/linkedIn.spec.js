/// <reference types="cypress" />

context('LinkedIn', () => {

  xit('HR discovering', () => {
    cy.fixture('credentials.json').as('user')
    cy.get('@user').then(user => cy.performLogin(user))
    cy.navigateToNetwork()
    cy.scrollDownTimes(10)
    cy.collectHR()
  })

  it.only('Sending request', () => {
    cy.fixture('credentials.json').as('user')
    cy.get('@user').then(user => cy.performLogin(user))
    cy.sendRequest()
  })

  it('fake login', () => {
    Cypress.config('baseUrl', '')
    cy.visit('cypress/fake/test.html') // {failOnStatusCode: false}
    cy.get('.ph5.pb5').then(el => {
      const myElement = el.find('.artdeco-button__text').first().text()
      cy.log(myElement)
    })
  })
})
