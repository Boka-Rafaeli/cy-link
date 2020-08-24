Cypress.Commands.add('performLogin', (user) => {
    cy.visit('login', {})
    cy.get('#username').focus().type(user.email, {delay: 10})
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
        cy.log(`💥💥💥💥 scrolling times => ${i + 1} from => ${scrollDownTimes} timer => ${timer}`)
        cy.get('#type-ahead-wormhole').scrollIntoView({duration: timer})
        cy.log(`wait for ${timer}`)
        cy.wait(timer)
    })
})

Cypress.Commands.add('collectHR', () => {
    let personName, personPosition, personHref, count = 0
    const results = []

    try {
        cy
            .get('[data-control-name="pymk_profile"]')
            .each(element => {
                personHref = element.attr('href')
                personName = element.find('.discover-person-card__name').text().trim()
                personPosition = element.find('.discover-person-card__occupation').text().trim()

                if (personPosition.includes('HR') || personPosition.includes('Acquisition') || personPosition.includes('Human Resources')) {
                    count++
                    cy.log(`👇👇👇👇👇👇`)
                    cy.log(`href => ${personHref}`)
                    cy.log(`name => ${personName}`)
                    cy.log(`position => ${personPosition}`)
                    results.push({name: personName, position: personPosition, href: personHref})
                    cy.log(`👆👆👆👆👆👆 ${count}`)
                }
            }).then(() => cy.writeFile('cypress/fixtures/hr.json', results))
    } finally {
        cy.writeFile('cypress/fixtures/hr.json', results)
    }
})

Cypress.Commands.add('sendRequest', () => {
    cy.fixture('hr.json').as('target')

    cy.get('@target').then(users => cy.log(`There are ${users.length} hrs.`))

    cy.get('@target').each(target => {
        cy.log(`Navigate to => : ${Cypress.config().baseUrl}${target.href}`)
        cy.visit(`${Cypress.config().baseUrl}${target.href}`)

        cy.get('.ph5.pb5').then(el => {
            const myElement = el.find('.artdeco-button__text').first()
            if (myElement.text().includes('Connect')) {
                cy.log(`Found element: ${myElement}`)
                myElement.trigger('click')
                cy.log(`Try Connect => 🥂🥂🥂🥂🥂`)
                cy.contains('Done').click()
                cy.log(`Done Connect => 🥂🥂🥂🥂🥂`)
            }

        })
    })
})
