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

    it('Should be able to submit a positive sentence, click the positive option, and see a new positive sentence', () => {
        cy.fixture('positive-sentiment.json').then((positiveSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', positiveSentimentAnalysis)
        })
        cy.fixture('positive-sentiment-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/happy?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('positive-sentiment-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/calm?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy.fixture('positive-sentiment-thesaurus-word3.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/ecstatic?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus3')
        })
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.positive')
            .click()
            .wait(['@thesaurus1', '@thesaurus2', '@thesaurus3'])
            .get('.panel.current-panel > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel.current-panel > :nth-child(2)')
            .contains('Bunnies make me feel happy calm and ecstatic')
            .get('.panel.current-panel > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel.current-panel > :nth-child(4)')
            .should('have.class', 'positive')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })

    it('Should be able to submit a positive sentence, click the negative option, and see a new negative sentence', () => {
        cy.fixture('positive-sentiment.json').then((positiveSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', positiveSentimentAnalysis)
        })
        cy.fixture('positive-sentiment-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/happy?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('positive-sentiment-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/calm?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy.fixture('positive-sentiment-thesaurus-word3.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/ecstatic?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus3')
        })
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2', '@thesaurus3'])
            .get('.panel.current-panel > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel.current-panel > :nth-child(2)')
            .contains('Bunnies make me feel happy calm and ecstatic')
            .get('.panel.current-panel > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel.current-panel > :nth-child(4)')
            .should('have.class', 'negative')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })
})
