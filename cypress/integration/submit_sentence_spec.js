describe('Submit Sentence', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    it('should load the homepage on page load', () => {
        cy
            .get('h1')
            .contains('A Better Way To Say That')
            .get('.saved-button')
            .contains('My Saved Sentences')
            .get('.current-panel')
            .should('be.visible')
            .get('.current-panel > textarea')
            .should('be.visible')
            .get('.current-panel > button')
            .contains('Submit')
    })
})
