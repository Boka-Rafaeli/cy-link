Cypress.Commands.add('performLoginCLI', () => {
    cy.visit('login') // {failOnStatusCode: false}

    const username = Cypress.env('username')
    const password = Cypress.env('password')

    cy.get('#username')
        .focus()
        .type(username, {delay: 10, log: false})

    cy.get('#password')
        .focus()
        .type(password, {delay: 10, log: false})

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
        timer = Math.floor(Math.random() * 999 + 3000)
        cy.log(`💥💥💥💥💥 times => ${i + 1} from => ${scrollDownTimes}`)
        cy.get('#type-ahead-wormhole').scrollIntoView({duration: timer})
        cy.log(`wait for ${timer}`)
        cy.wait(timer)
    })
})

Cypress.Commands.add('collectHR', (contactsNumber) => {
    let personName, personPosition, personHref, count = 0, name = 0, results = []
    cy
        .get('.discover-entity-type-card__info-container')
        .each(element => {
            personHref = element
                .find('.discover-entity-type-card__link')
                .get(0).href

            personName = element
                .find('.discover-person-card__name')
                .text().trim()

            personPosition = element
                .find('.discover-person-card__occupation')
                .text().trim()

            if (personPosition.includes('HR') || personPosition.includes('Acquisition') || personPosition.includes('Human Resources')) {
                count++
                // cy.log(`name => ${personName}`)
                // cy.log(`position => ${personPosition}`)
                // results.push({name: personName, position: personPosition, href: personHref})

                results.push({href: personHref})
                cy.log(`👆👆👆 => ${count} 👆👆👆 => ${personHref}`)
                cy.createFile(name, results)

                // if (count > contactsNumber) {
                //     cy.createFile(name, results)
                //     count = 0
                //     results = []
                //     name = name + 1
                // }
            }
        })
})

Cypress.Commands.add('createFile', (name, results) => {
    cy.log(`👺👺👺👺👺 => createFile hr_${name}.json`)
    cy.writeFile(`cypress/fixtures/hr_${name}.json`, results)
})

Cypress.Commands.add('sendRequest', (f) => {

    cy.fixture(`${f}`).as('target')

    // cy.get('@target').each(users => {
    //     // cy.log(`🐶🐶🐶🐶🐶 => ${users.length} hrs.`)
    //     Cypress._.times(users.length, (i) => {
    //         cy.log(`🕸️🕸️🕸️️🕸️🥂 => ${users.href}`)
    //         cy.visit(`${users.href}`)
    //
    //         cy.get('.ph5.pb5').then(el => {
    //             const myElement = el.find('.artdeco-button__text').first()
    //             if (myElement.text().includes('Connect')) {
    //                 myElement.trigger('click')
    //                 cy.contains('Done').click()
    //                 cy.log(`🥂🥂🥂🥂🥂 => Connect`)
    //             }
    //         })
    //         cy.log(`Sent ${i} 🐶🐶🐶🐶🐶 => from ${users.length}`)
    //     })
    // })

    cy.get('@target').each(target => {
        cy.log(`🕸️🕸️🕸️️🕸️🥂 => ${target.href}`)
        cy.visit(`${target.href}`)


        cy.get('.ph5.pb5').then(el => {
            const myElement = el.find('.artdeco-button__text').first()
            if (myElement.text().includes('Connect')) {
                myElement.trigger('click')
                cy.contains('Done').click()
                cy.log(`🥂🥂🥂🥂🥂 => Connect`)
            }
        })

        cy.log(`🐶🐶🐶🐶🐶 => ${target.length}`)
    })

    // cy.get('@target').each(target => {
    //     // cy.log(`Navigate to => : ${Cypress.config().baseUrl}${target.href}`)
    //     // cy.visit(`${Cypress.config().baseUrl}${target.href}`)
    //
    //     cy.log(`🕸️🕸️🕸️🕸️🕸️ => Navigate: ${target.href}`)
    //     cy.visit(`${target.href}`)
    //
    //     cy.get('.ph5.pb5').then(el => {
    //         const myElement = el.find('.artdeco-button__text').first()
    //         if (myElement.text().includes('Connect')) {
    //             myElement.trigger('click')
    //             cy.contains('Done').click()
    //             cy.log(`🥂🥂🥂🥂🥂 => Connect`)
    //         }
    //     })
    // })
})

