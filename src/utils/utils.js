export const cleanSentimentAnalysis = (result) => {
    const sentiment = convertToFullSentiment(result.score_tag)
    const polarityTerms = result.sentence_list[0].segment_list[0].polarity_term_list.map(word => {
        let wordSentiment = convertToFullSentiment(word.score_tag)
        return {
            text: word.text,
            wordSentiment
        }
    })
    return {
        sentiment,
        polarityTerms,
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