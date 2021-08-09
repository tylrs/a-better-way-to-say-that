export const cleanSentence = (sentence) => {
    let newSentence = sentence.replaceAll(/[^a-zA-Z ]/g,'')
    return newSentence
}

const cleanWord = (word) => {
    if (word.includes('(')) {
      let splitWord = word.split('');
      let index1 = splitWord.indexOf('(');
      let index2 = splitWord.indexOf(')');
      splitWord.splice(index1, index2 - index1 + 1, '');
      word = splitWord.join('');
    }
    let newWord = word.replaceAll(/[^a-zA-Z]/g, '');
    if (newWord.includes('V')) {
      let splitWord = newWord.split('');
      let index = splitWord.indexOf('V');
      splitWord.splice(index, 1, '');
      newWord = splitWord.join('');
    }
    return newWord;
  };

export const cleanSentimentAnalysis = (result) => {
    const sentiment = convertToFullSentiment(result.score_tag)
    let positiveTerms = []
    let negativeTerms = []
    result.sentence_list[0].segment_list.forEach(segment => {
        segment.polarity_term_list.forEach(word => {
            let wordSentiment = convertToFullSentiment(word.score_tag)
            let cleanedText = cleanWord(word.text)
            wordSentiment.includes('positive') 
            ? positiveTerms.push({text: cleanedText, wordSentiment})
            : negativeTerms.push({text: cleanedText, wordSentiment})
        })
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
            fullSentiment = 'positive'
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
            fullSentiment = 'negative'
            break;
        default:
            fullSentiment = 'without emotion'    
    }
    return fullSentiment;
}

export const findNewWord = (result, directionChange, wordType) => {
    let newWordType;
    directionChange !== wordType ? newWordType = 'ants' : newWordType = 'syns'
    let random1 = randomizer(result[0].meta[newWordType].length)
    let random2 = randomizer(result[0].meta[newWordType][random1].length)
    let newWord = result[0].meta[newWordType][random1][random2]
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
    return {updatedPositiveTerms, updatedNegativeTerms};
}

export const createNewSentence = (originalSentence, newPositiveWords, newNegativeWords) => {
    const allNewWords = newPositiveWords.concat(newNegativeWords)
    const splitOriginalSentence = originalSentence.split(' ')
    allNewWords.forEach(word => {
        splitOriginalSentence.splice(word.originalIndex, 1, word.text)
    })
    let newSentence = splitOriginalSentence.join(' ')
    return newSentence
}

export const checkPanelLength = (panelContent, panel) => {
    let length1, length2, sum, overflowClass
    if (Array.isArray(panelContent[3]) && Array.isArray(panelContent[5])) {
        length1 = panelContent[3].length;
        length2 = panelContent[5].length;
        sum = length1 + length2
    } else if (Array.isArray(panelContent[3])) {
        sum = panelContent[3].length
    } else if (Array.isArray(panelContent[5])) {
        sum = panelContent[5].length
    }
    overflowClass = sum > 5 ? `num${panel}` : ''
    return overflowClass
}
