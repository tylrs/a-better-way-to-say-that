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

    it('Should not be able to type in more than 74 characters', () => {
        cy
        .get('textarea')
        .type('Bunnies make me feel happy calm ecstatic melancholy Bunnies make me feel happy calm ecstatic melancholy')
        .get('.panel-container > :nth-child(1) > :nth-child(2)')
        .contains('Your sentence cannot have more than 74 characters')
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
            .get('.panel-container > :nth-child(3) > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('Bunnies make me feel happy calm and ecstatic')
            .get('.panel-container > :nth-child(3) > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(4)')
            .should('have.class', 'positive')
            .get('.panel-container > :nth-child(3) > :nth-child(5)')
            .contains('continue')
    })

    it('Should clean out any characters except for letters and spaces from a user\'s input', () => {
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
            .type('Bunnies make, me$% &feel happy, calm and #ecstatic+')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2', '@thesaurus3'])
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('Bunnies make me feel happy calm and ecstatic')
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
            .get('.panel-container > :nth-child(3) > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('Bunnies make me feel happy calm and ecstatic')
            .get('.panel-container > :nth-child(3) > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(4)')
            .should('have.class', 'negative')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })

    it('Should be able to type in a sentence with negative words and see those identified', () => {
        cy.fixture('negative-sentiment.json').then((negativeSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', negativeSentimentAnalysis)
        })
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('h3.result')
            .contains('negative')
            .get('.panel.current-panel')
            .should('not.have', 'Positive words:')
            .get('.panel.current-panel > :nth-child(3)')
            .contains('Negative words:')
            .get('.panel.current-panel > :nth-child(4)')
            .contains('smelly')
            .get('.panel.current-panel > :nth-child(5)')
            .contains('scary')
            .get('.current-panel.positive')
            .contains('positive')
            .get('.current-panel.negative')
            .contains('negative')
    })

    it('Should be able to submit a negative sentence, click the positive option, and see a new positive sentence', () => {
        cy.fixture('negative-sentiment.json').then((negativeSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', negativeSentimentAnalysis)
        })
        cy.fixture('negative-sentiment-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/smelly?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('negative-sentiment-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/scary?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy
            .get('textarea')
            .type('Turing students are smelly and scary')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.positive')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel-container > :nth-child(3) > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('Turing students are smelly and scary')
            .get('.panel-container > :nth-child(3) > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(4)')
            .should('have.class', 'positive')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })

    it('Should be able to submit a negative sentence, click the negative option, and see a new negative sentence', () => {
        cy.fixture('negative-sentiment.json').then((negativeSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', negativeSentimentAnalysis)
        })
        cy.fixture('negative-sentiment-thesaurus-word1.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/smelly?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus1')
        })
        cy.fixture('negative-sentiment-thesaurus-word2.json').then((thesaurusResponse) => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/scary?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', thesaurusResponse).as('thesaurus2')
        })
        cy
            .get('textarea')
            .type('Turing students are smelly and scary')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.negative')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel-container > :nth-child(3) > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('Turing students are smelly and scary')
            .get('.panel-container > :nth-child(3) > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(4)')
            .should('have.class', 'negative')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })

    it('Should be able to type in a sentence with both positive and negative words and see those identified', () => {
        cy.fixture('mixed-sentiment.json').then((mixedSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', mixedSentimentAnalysis)
        })
        cy
            .get('textarea')
            .type('I get angry when I see other people having fun')
            .get('.current-panel > button')
            .click()
            .get('h3.result')
            .contains('neutral')
            .get('.panel.current-panel > :nth-child(3)')
            .contains('Positive words:')
            .get('.panel.current-panel > :nth-child(4)')
            .contains('fun')
            .get('.panel.current-panel > :nth-child(5)')
            .contains('Negative words:')
            .get('.panel.current-panel > :nth-child(6)')
            .contains('angry')
            .get('.current-panel.positive')
            .contains('positive')
            .get('.current-panel.negative')
            .contains('negative')
    })

    it('Should be able to submit a mixed sentiment sentence, click the positive option, and see a new positive sentence', () => {
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
            .get('.current-panel.positive')
            .click()
            .wait(['@thesaurus1', '@thesaurus2'])
            .get('.panel-container > :nth-child(3) > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('I get angry when I see other people having fun')
            .get('.panel-container > :nth-child(3) > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(4)')
            .should('have.class', 'positive')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })

    it('Should be able to submit a mixed sentiment sentence, click the negative option, and see a new negative sentence', () => {
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
            .get('.panel-container > :nth-child(3) > :nth-child(1)')
            .contains('Here is your original sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(2)')
            .contains('I get angry when I see other people having fun')
            .get('.panel-container > :nth-child(3) > :nth-child(3)')
            .contains('Here is your new sentence:')
            .get('.panel-container > :nth-child(3) > :nth-child(4)')
            .should('have.class', 'negative')
            .get('.panel.current-panel > .current-panel')
            .contains('continue')
    })

    it('Should be able to submit a sentence without emotion words and see a button to start over', () => {
        cy.fixture('neutral-sentiment.json').then((neutralSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', neutralSentimentAnalysis)
        })
        cy 
            .get('textarea')
            .type('There is a cat')
            .get('.current-panel > button')
            .click()
            .get('.panel-container > :nth-child(2) > :nth-child(1)')
            .contains('Sentence Analysis:')
            .get('.panel-container > :nth-child(2) > :nth-child(2)')
            .contains('without emotion')
            .get('.panel-container > :nth-child(2) > :nth-child(3)')
            .contains('You did not have any positive or negative words')
            .get('.panel-container > :nth-child(2) > :nth-child(4)')
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

    it('Should be able to click continue and see options for starting over or saving a sentence', () => {
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
            .get('.panel.current-panel > :nth-child(1)')
            .contains('Your new sentence')
            .get('.panel.current-panel > :nth-child(2)')
            .should('have.class', 'negative')
            .get('.panel.current-panel > :nth-child(3)')
            .contains('You can now:')
            .get('.panel.current-panel > :nth-child(4)')
            .contains('Save this')
            .get('.panel.current-panel > :nth-child(6)')
            .contains('Start over')
    })

    it('Should show an error if a bad route is entered', () => {
        cy
            .visit('localhost:3000/banana')
            .get('.error')
            .contains('404 Not Found')
    })

    it('Should show an error if the sentiment analysis fetch fails', () => {
        cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', {statusCode: 500})
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('.error')
            .contains('We\'re sorry, we had trouble submitting your sentence, please refresh.')
    })
 
    it('Should show an error if the sentiment analysis returns a 400 level error', () => {
        cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', {statusCode: 400})
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('.error')
            .contains('We\'re sorry, we had trouble submitting your sentence, please refresh.')
    })

    it('Should show an error if the thesaurus fetch fails', () => {
        cy.fixture('positive-sentiment.json').then((positiveSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', positiveSentimentAnalysis)
        })
        cy.fixture('positive-sentiment-thesaurus-word1.json').then(() => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/happy?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', {statusCode: 500}).as('thesaurus1')
        })
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.positive')
            .click()
            .wait('@thesaurus1')
            .get('.error')
            .contains('We\'re sorry, we had trouble replacing words in your sentence, please refresh.')
    })

    it('Should show an error if the thesaurus fetch returns a 400 level error', () => {
        cy.fixture('positive-sentiment.json').then((positiveSentimentAnalysis) => {
            cy.intercept('POST', 'https://api.meaningcloud.com/sentiment-2.1', positiveSentimentAnalysis)
        })
        cy.fixture('positive-sentiment-thesaurus-word1.json').then(() => {
            cy.intercept('https://dictionaryapi.com/api/v3/references/thesaurus/json/happy?key=9691e0fb-dd4a-4c0f-b4e2-b340a964a4bb', {statusCode: 400}).as('thesaurus1')
        })
        cy
            .get('textarea')
            .type('Bunnies make me feel happy calm and ecstatic')
            .get('.current-panel > button')
            .click()
            .get('.current-panel.positive')
            .click()
            .wait('@thesaurus1')
            .get('.error')
            .contains('We\'re sorry, we had trouble replacing words in your sentence, please refresh.')
    })
})