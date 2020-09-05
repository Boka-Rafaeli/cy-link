/// <reference types="cypress" />

context('LinkedIn', () => {

    xit('HR discovering', () => {
        cy.performLoginCLI()
        cy.navigateToNetwork()
        cy.scrollDownTimes(40)

        const found = 0
        cy.collectHR(found)

        // const cycle = 10
        // Cypress._.times(cycle, (i) => {
        //     cy.scrollDownTimes(2)
        //     cy.collectHR()
        //     cy.log(`🐍🐍🐍🐍🐍 cycle => ${i} from ${cycle}`)
        // })
    })

    it('Sending request', () => {
        cy.performLoginCLI()
        cy.sendRequest('2.json')
    })

    xit('fake login', () => {
        Cypress.config('baseUrl', '')
        // cy.visit('cypress/fake/test1.html')
        // cy.visit('cypress/fake/test3.html')
        cy.visit('cypress/fake/1500_hr.html')

        const position = ['HR', 'Acquisition', 'Human Resources', 'Acquisition', 'Recruiter', 'Recruiting', 'Headhunter', 'Head Hunter']

        let personName, personPosition, personHref, count = 0, hr_arr = []
        let index = 0

        cy.get('.discover-person-card__occupation').each(el => {
            // console.log(el.text())
            // console.log(el.parent().get(0).pathname) // link
            // console.log(el.get(0).innerText) // position

            personPosition = el.get(0).innerText.toLowerCase()
            personHref = el.parent().get(0).pathname

            Cypress._.each(position, k => {
                if (personPosition.includes(k.toLowerCase())) hr_arr.push({position: personPosition, href: personHref})
            })
        })
        console.log(hr_arr)
        cy.createFile('hr_arr', hr_arr)
    })
})
