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
        timer = Math.floor(Math.random() * 999 + 2000)
        cy.log(`💥💥💥💥💥 times => ${i + 1} from => ${scrollDownTimes}`)
        cy.get('#type-ahead-wormhole').scrollIntoView({duration: timer})
        cy.wait(timer)
    })
})

Cypress.Commands.add('count', () => {
    cy.get('.discover-entity-type-card__info-container')
        .then(el => {
            cy.log(`count: ${el.length}`)
            cy.log(`person: ${el.get(el.length - 1)}`)
            console.log(el.get(8))
            console.log(el.get(9))
            console.log(el.get(10))
        })
})

Cypress.Commands.add('collectHR', (found) => {
    let personName, personPosition, personHref, count = 0, hr_arr = [], all_arr = []
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

                if (count > found) {
                    hr_arr.push({name: personName, position: personPosition, href: personHref})
                    cy.log(`👆👆👆 => ${count} ${personName}`)
                }
            }
            all_arr.push({name: personName, position: personPosition, href: personHref})
        })

    try {
        cy.log('========= hr_arr =========')
        cy.log(hr_arr)
        cy.log('========= all_arr =========')
        cy.log(all_arr)

        cy.createFile('hr_arr', hr_arr)
        cy.createFile('all_arr', all_arr)
    } finally {
        cy.createFile('hr_arr', hr_arr)
        // cy.createFile('all_arr', all_arr)
    }

})

Cypress.Commands.add('createFile', (name, results) => {
    cy.log(`👺👺👺👺👺 => Try createFile ${name.toUpperCase()}`)
    cy.writeFile(`cypress/fixtures/${name}.json`, results)
    cy.log(`🐶🐶🐶🐶🐶 => Done createFile ${name.toUpperCase()}`)
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
        cy.log(`🐶🐶🐶🐶🐶 => ${target.href}`)
        cy.visit(`${target.href}`)


        cy.get('.ph5.pb5').then(el => {
            const myElement = el.find('.artdeco-button__text').first()
            if (myElement.text().includes('Connect')) {
                myElement.trigger('click')
                cy.contains('Done').click()
                cy.log(`🥂🥂🥂🥂🥂 => Connect`)
            }

            // cy.get('label')
            // if (myElement.text().includes('Add a note')) {
            //     // myElement.trigger('click')
            //     // cy.contains('Done').click()
            //     cy.get('.artdeco-modal__dismiss').click({force: true})
            //     cy.log(`🥂🥂🥂🥂🥂 => CLOSE`)
            // }

        })

        // cy.log(`🐶🐶🐶🐶🐶 => ${target.length}`)
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

Cypress.Commands.add('removeDup', () => {

    function getUniqueArray(arr = [], compareProps = []) {
        let modifiedArray = [];
        if (compareProps.length === 0 && arr.length > 0)
            compareProps.push(...Object.keys(arr[0]));
        arr.map(item => {
            if (modifiedArray.length === 0) {
                modifiedArray.push(item);
            } else {
                if (!modifiedArray.some(item2 =>
                    compareProps.every(eachProps => item2[eachProps] === item[eachProps])
                )) {
                    modifiedArray.push(item);
                }
            }
        });
        return modifiedArray;
    }
})

// console.log(JSON.stringify(getUniqueArray(a)))


Cypress.Commands.add('navigateToFilteredNetwork', (num) => {
    cy.visit(`search/results/people/?facetGeoUrn=["101620260"]&facetIndustry=["137"]&facetNetwork=["F"]&origin=FACETED_SEARCH&page=${num}`)
    // cy.url().should('include', 'mynetwork')
    // https://www.linkedin.com/search/results/people/?facetGeoUrn=["101620260"]&facetIndustry=["137"]&facetNetwork=["F"]&origin=FACETED_SEARCH
})
