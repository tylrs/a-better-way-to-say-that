export const cleanSentimentAnalysis = (result) => {
    const polarityTerms = result.sentence_list[0].segment_list[0].polarity_term_list.map(term => {
        return {
            text: term.text,
            sentiment: term.score_tag
        }
    })
    return {
        sentiment: result.score_tag,
        polarityTerms,
        agreement: result.agreement
    }
}