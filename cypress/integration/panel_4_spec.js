describe('Panel 4 User Flows', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    it('Should be able to click Start Over and see the 1st panel display', () => {
        cy.fixture('mixed-sentiment.json').then((mixedSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', mixedSentimentAnalysis)
        })
        cy.fixture('mixed-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/angry?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('mixed-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/fun?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy
            .get('textarea')
            .type('I get angry when I see other people having fun')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel.current-panel > .negative + button')
            .click()
            .get('.panel.current-panel > :nth-child(6)')
            .click()
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

    it('Should be able to click Save This and see a message indicating the save was successful', () => {
        cy.fixture('mixed-sentiment.json').then((mixedSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', mixedSentimentAnalysis)
        })
        cy.fixture('mixed-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/angry?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('mixed-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/fun?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy
            .get('textarea')
            .type('I get angry when I see other people having fun')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel.current-panel > .negative + button')
            .click()
            .get('.panel.current-panel > :nth-child(4)')
            .click()
            .get('.panel.current-panel > :nth-child(5)')
            .contains('Successfully Saved')
    })

    it('Should be able to click Save This on an already saved message and see a message indicating this', () => {
        cy.fixture('mixed-sentiment.json').then((mixedSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', mixedSentimentAnalysis)
        })
        cy.fixture('mixed-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/angry?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('mixed-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/fun?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy
            .get('textarea')
            .type('I get angry when I see other people having fun')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel.current-panel > .negative + button')
            .click()
            .get('.panel.current-panel > :nth-child(4)')
            .click()
            .get('.panel.current-panel > :nth-child(4)')
            .click()
            .get('.panel.current-panel > :nth-child(5)')
            .contains('You\'ve already saved this message')
  
    })

    it('Should be able to click my saved sentences after saving a sentence and see that sentence displayed', () => {
        cy.fixture('mixed-sentiment.json').then((mixedSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', mixedSentimentAnalysis)
        })
        cy.fixture('mixed-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/angry?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('mixed-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/fun?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy
            .get('textarea')
            .type('I get angry when I see other people having fun')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel.current-panel > .negative + button')
            .click()
            .get('.panel.current-panel > :nth-child(4)')
            .click()
            .get('.result').then(($newSentence) => {
                const newSentence = $newSentence.text()
                cy
                .get('.saved-button')
                .click()
                .get('h2')
                .contains('Your Saved Sentences')
                .get('.sentence > :nth-child(1)')
                .contains('Your Sentence')
                .get('.sentence > :nth-child(2)')
                .contains(newSentence)
                .get('.sentence > :nth-child(3)')
                .contains('Your Sentence')
                .get('.sentence > :nth-child(4)')
                .contains('negative')
            })
    })
})