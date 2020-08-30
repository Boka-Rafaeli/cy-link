/// <reference types="cypress" />

context('LinkedIn', () => {

    xit('HR discovering', () => {
        cy.performLoginCLI()
        cy.navigateToNetwork()

        const cycle = 25
        Cypress._.times(cycle, (i) => {
            cy.scrollDownTimes(2)
            cy.collectHR()
            // cy.collectHR(50)
            cy.log(`🐍🐍🐍🐍🐍 cycle => ${i} from ${cycle}`)
        })
        // cy.collectHR(10)
    })

    it('Sending request', () => {
        cy.performLoginCLI()
        cy.sendRequest('hr_0.json')
    })

    xit('fake login', () => {
        Cypress.config('baseUrl', '')
        cy.visit('cypress/fake/test.html') // {failOnStatusCode: false}

        cy.collectHR(25)

        // cy.get('.ph5.pb5').then(el => {
        //     const myElement = el.find('.artdeco-button__text').first().text()
        //     cy.log(myElement)
        // })
    })

})
