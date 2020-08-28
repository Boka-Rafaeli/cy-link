/// <reference types="cypress" />

context('LinkedIn', () => {

    xit('HR discovering', () => {
        cy.fixture('credentials.json').as('user')
        cy.get('@user').then(user => cy.performLogin(user))
        cy.navigateToNetwork()

        Cypress._.times(5, (i) => {
            cy.scrollDownTimes(2)
            cy.collectHR(10)
            cy.log(`🐍🐍🐍🐍🐍 cycle => ${i}`)
        })
        // cy.scrollDownTimes(5)
        // cy.collectHR(20)
    })

    it.only('Sending request', () => {

        // cy.fixture('credentials.json').as('user')
        // cy.get('@user').then(user => cy.performLogin(user))

        cy.performLoginCLI()

        // cy.fixture('hr_0.json').as('target')
        // cy.get('@target').then(users => cy.log(`There are ${users.length} hrs.`))
        // cy.get('@f1').then(f => cy.sendRequest(f))

        cy.sendRequest('hr_0.json')

        // cy.fixture('hr_0.json').as('f1')
        // cy.get('@f1').then(f => cy.sendRequest(f))

        // Cypress.Promise
        //     .all([cy.fixture('hr_0'), cy.fixture('hr_1')])
        //     .spread((city, country) => {
        //     })

    })

    xit('fake login', () => {
        Cypress.config('baseUrl', '')
        cy.visit('cypress/fake/test.html') // {failOnStatusCode: false}
        cy.get('.ph5.pb5').then(el => {
            const myElement = el.find('.artdeco-button__text').first().text()
            cy.log(myElement)
        })
    })
})
