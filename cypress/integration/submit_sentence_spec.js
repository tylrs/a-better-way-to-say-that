describe('Submit Sentence', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    it('Should load the homepage on page load', () => {
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

    it('Should be able to type in a sentence with positive words and see those identified', () => {
        cy.fixture('positive-sentiment.json').then((positiveSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', positiveSentimentAnalysis)
        })
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('h3.result')
            .contains('positive')
            .get('.panel.current-panel')
            .should('not.have', 'Negative words:')
            .get('.panel.current-panel > :nth-child(3)')
            .contains('Positive words:')
            .get('.panel.current-panel > :nth-child(4)')
            .contains('happy')
            .get('.panel.current-panel > :nth-child(5)')
            .contains('calm')
            .get('.panel.current-panel > :nth-child(6)')
            .contains('ecstatic')
            .get('.current-panel.positive')
            .contains('positive')
            .get('.current-panel.negative')
            .contains('negative')
    })
})
