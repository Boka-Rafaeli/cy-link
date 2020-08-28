Cypress.Commands.add('performLogin', (user) => {
    cy.visit('login', {})
    cy.get('#username').focus().type(user.email, {delay: 10, log: false})
    cy.get('#password').focus().type(user.password, {delay: 10, log: false})
    cy.get('.btn__primary--large').click()
    cy.url().should('include', 'feed')
})

Cypress.Commands.add('navigateToNetwork', () => {
    cy.get('#mynetwork-nav-item').click()
    cy.url().should('include', 'mynetwork')
})

Cypress.Commands.add('scrollDownTimes', (scrollDownTimes) => {
    scrollDownTimes = typeof scrollDownTimes === "number" && scrollDownTimes > 0 ? scrollDownTimes : 1
    let timer
    Cypress._.times(scrollDownTimes, (i) => {
        timer = Math.floor(Math.random() * 999 + 2000)
        cy.log(`💥💥💥💥💥 scrolling times => ${i + 1} from => ${scrollDownTimes}`)
        cy.get('#type-ahead-wormhole').scrollIntoView({duration: timer})
        cy.log(`wait for ${timer}`)
        cy.wait(timer)
    })
})

Cypress.Commands.add('collectHR', (contactsNumber) => {
    let personName, personPosition, personHref, count = 0, name = 0, results = []
    cy
        .get('[data-control-name="pymk_profile"]')
        .each(element => {
            personHref = element.attr('href')
            personName = element.find('.discover-person-card__name').text().trim()
            personPosition = element.find('.discover-person-card__occupation').text().trim()

            if (personPosition.includes('HR') || personPosition.includes('Acquisition') || personPosition.includes('Human Resources')) {
                count++
                cy.log(`href => ${personHref}`)
                cy.log(`name => ${personName}`)
                cy.log(`position => ${personPosition}`)
                results.push({name: personName, position: personPosition, href: personHref})
                cy.log(`👆👆👆👆👆 ${count}`)

                if (count > contactsNumber) {
                    cy.createFile(name, results)
                    count = 0
                    results = []
                    name = name + 1
                }
            }
        })
})

Cypress.Commands.add('createFile', (name, results) => {
    cy.log(`🐲🐲🐲🐲🐲 => createFile hr_${name}.json`)
    cy.writeFile(`cypress/fixtures/hr_${name}.json`, results)
})


Cypress.Commands.add('sendRequest', (f) => {
    cy.fixture(`${f}`).as('target')
    cy.get('@target').then(users => cy.log(`🐶🐶🐶🐶🐶 found ${users.length} hrs.`))

    cy.get('@target').each(target => {
        cy.log(`Navigate to => : ${Cypress.config().baseUrl}${target.href}`)
        cy.visit(`${Cypress.config().baseUrl}${target.href}`)

        cy.get('.ph5.pb5').then(el => {
            const myElement = el.find('.artdeco-button__text').first()
            if (myElement.text().includes('Connect')) {
                myElement.trigger('click')
                cy.contains('Done').click()
                cy.log(`🥂🥂🥂🥂🥂 => Connect`)
            }
        })
    })
})
