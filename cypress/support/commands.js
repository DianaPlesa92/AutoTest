Cypress.Commands.add("login", () => {
    cy.visit({
        method: 'POST',
        url: "https://duckduckgo.com", // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    })
})