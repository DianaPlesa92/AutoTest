import './commands'

before(() => {
    Cypress.session.clearAllSavedSessions()
    cy.log("Clear All Sessions")
})

beforeEach(function () {
    cy.log('in before each')
    cy.session('mySession', () => {
        cy.login()
        cy.log('in cy session')
    })
})