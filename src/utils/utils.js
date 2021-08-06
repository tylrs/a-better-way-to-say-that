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
    let random2 = randomizer(result[0].meta[newWordType][random1].length)
    let newWord = result[0].meta[newWordType][random1][random2]
    console.log(`This is the new word which is a ${newWordType}>>>>`,newWord)
    return newWord;
}

const randomizer = (max) => {
    return Math.floor(Math.random() * (max-1) + 1);
}