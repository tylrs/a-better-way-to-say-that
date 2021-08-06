export const cleanSentimentAnalysis = (result) => {
    const sentiment = convertToFullSentiment(result.score_tag)
    let positiveTerms = []
    let negativeTerms = []
    result.sentence_list[0].segment_list[0].polarity_term_list.forEach(word => {
        let wordSentiment = convertToFullSentiment(word.score_tag)
        if (word.text.includes('@')) {
            word.text = word.text.replace('@V', 'ing')
        }
        wordSentiment.includes('positive') 
        ? positiveTerms.push({text: word.text, wordSentiment})
        : negativeTerms.push({text: word.text, wordSentiment})
    })
    return {
        sentiment,
        positiveTerms,
        negativeTerms,
        agreement: result.agreement
    }
}

const convertToFullSentiment = (tag) => {
    let fullSentiment;
    switch (tag) {
        case 'P+':
            fullSentiment = 'very positive'
            break;
        case 'P':
            fullSentiment = 'positive'
            break;
        case 'NEU':
            fullSentiment = 'neutral'
            break;
        case 'N':
            fullSentiment = 'negative'
            break;
        case 'N+':
            fullSentiment = 'very negative'
            break;
        default:
            fullSentiment = 'without emotion'    
    }
    return fullSentiment;
}

export const findNewWord = (result, directionChange, wordType) => {
    console.log("this is the direction change>>", directionChange, "this is the word type>>>>", wordType)
    let newWordType;
    directionChange !== wordType ? newWordType = 'ants' : newWordType = 'syns'

    let random1 = randomizer(result[0].meta[newWordType].length)
    console.log("This is the first random number>>>", random1)
    let random2 = randomizer(result[0].meta[newWordType][random1].length)
    console.log("This is the second random number>>>", random2)
    let newWord = result[0].meta[newWordType][random1][random2]
    console.log(`This is the new word which is a ${newWordType}>>>>`,newWord)
    return newWord;
}

const randomizer = (max) => {
    if (max === 1) {
        return 0;
    } 
    return Math.floor(Math.random() * (max-1) + 1);
}

export const findIndices = (positiveTerms, negativeTerms, originalSentence) => {
    const allTerms = positiveTerms.concat(negativeTerms)
    const splitOriginalSentence = originalSentence.split(' ')
    // console.log(splitOriginalSentence)
    let updatedPositiveTerms = []
    let updatedNegativeTerms = []
    allTerms.forEach(term => {
       let index = splitOriginalSentence.indexOf(term.text)
       if (index !== -1) term.originalIndex = index;
       if (term.wordSentiment === 'positive') {
        updatedPositiveTerms.push(term)
       } else {
        updatedNegativeTerms.push(term)
       }
    })
    // console.log(updatedPositiveTerms, updatedNegativeTerms)
    return {updatedPositiveTerms, updatedNegativeTerms};
}

export const createNewSentence = (originalSentence, newPositiveWords, newNegativeWords) => {
    const allNewWords = newPositiveWords.concat(newNegativeWords)
    const splitOriginalSentence = originalSentence.split(' ')
    allNewWords.forEach(word => {
        console.log(word)
        splitOriginalSentence.splice(word.originalIndex, 1, word.text)
    })
    let newSentence = splitOriginalSentence.join(' ')
    console.log("new sentence>>>>>", newSentence)
    return newSentence
}